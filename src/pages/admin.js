import React from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function AdminPage() {
  const [activeTab, setActiveTab] = React.useState("products");
  const [products, setProducts] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [newProduct, setNewProduct] = React.useState({
    name: "",
    price: "",
    description: "",
    images: [],
    video: "",
    stock_left: 0,
    company_name: "",
  });
  const [imageFiles, setImageFiles] = React.useState([]);
  const [videoFile, setVideoFile] = React.useState(null);
  const [uploadProgress, setUploadProgress] = React.useState({}); // per file progress
  const [admin, setAdmin] = React.useState(null);
  const [creds, setCreds] = React.useState({ email: "", password: "" });

  React.useEffect(() => {
    checkAdmin();
    fetchProducts();
    fetchOrders();
  }, []);

  async function checkAdmin() {
    try {
      const r = await fetch("/api/admin/me", { credentials: "include" });
      if (r.ok) {
        const data = await r.json();
        setAdmin(data);
      }
    } catch (e) {
      console.error("Admin check failed:", e);
    }
  }

  async function fetchProducts() {
    try {
      const r = await fetch("/api/products");
      if (!r.ok) throw new Error("Failed to fetch products");
      const j = await r.json();
      setProducts(j);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Error loading products");
    }
  }

  async function fetchOrders() {
    try {
      const r = await fetch("/api/orders");
      if (!r.ok) throw new Error("Failed to fetch orders");
      const j = await r.json();
      setOrders(j);
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("Error loading orders");
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creds),
        credentials: "include",
      });

      if (r.ok) {
        const data = await r.json();
        setAdmin(data);
        alert("Logged in successfully");
      } else {
        const error = await r.json();
        alert(`Login failed: ${error.error}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  }

  // ---- Upload with per-file progress ----
  async function uploadSingleFile(file, index, type = "image") {
    const fd = new FormData();
    fd.append("file", file);

    const res = await axios.post("/api/upload", fd, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (e) => {
        if (e.total) {
          const percent = Math.round((e.loaded * 100) / e.total);
          setUploadProgress((prev) => ({
            ...prev,
            [`${type}-${index}`]: percent,
          }));
        }
      },
    });

    return res.data.urls[0];
  }

  async function handleAddProduct() {
    try {
      if (!newProduct.name || !newProduct.price) {
        alert("Name and price are required");
        return;
      }

      let imageUrls = [];
      let videoUrl = "";

      // upload each image separately with progress
      for (let i = 0; i < imageFiles.length; i++) {
        const url = await uploadSingleFile(imageFiles[i], i, "image");
        imageUrls.push(url);
      }

      // upload video separately
      if (videoFile) {
        videoUrl = await uploadSingleFile(videoFile, 0, "video");
      }

      const payload = {
        ...newProduct,
        images: imageUrls,
        video: videoUrl,
        price: parseFloat(newProduct.price),
        stock_left: parseInt(newProduct.stock_left) || 0,
      };

      const r = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!r.ok) {
        const error = await r.json();
        throw new Error(error.error || "Failed to add product");
      }

      const p = await r.json();
      setProducts((prev) => [p, ...prev]);

      setNewProduct({
        name: "",
        price: "",
        description: "",
        images: [],
        video: "",
        stock_left: 0,
        company_name: "",
      });
      setImageFiles([]);
      setVideoFile(null);
      setUploadProgress({});

      alert("Product added successfully");
    } catch (e) {
      console.error("Error adding product:", e);
      alert("Error adding product: " + e.message);
    }
  }

  function handleLogout() {
    setAdmin(null);
    setCreds({ email: "", password: "" });
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  function parseImages(product) {
    if (!product.images) return [];
    if (Array.isArray(product.images)) return product.images;
    try {
      return JSON.parse(product.images) || [];
    } catch {
      return [];
    }
  }

  if (!admin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="admin@example.com"
                value={creds.email}
                onChange={(e) => setCreds({ ...creds, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Password"
                type="password"
                value={creds.password}
                onChange={(e) =>
                  setCreds({ ...creds, password: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 bg-gray-900 text-white p-6 space-y-6">
        <h1 className="text-2xl font-bold">Admin ⚙️</h1>
        <p className="text-sm text-gray-300 mt-1">Welcome, {admin.email}</p>

        <nav className="space-y-2">
          <button
            className={`block w-full text-left px-4 py-2 rounded transition ${
              activeTab === "products" ? "bg-pink-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("products")}
          >
            📦 Products
          </button>
          <button
            className={`block w-full text-left px-4 py-2 rounded transition ${
              activeTab === "orders" ? "bg-pink-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            🛒 Orders
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          🚪 Logout
        </button>
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        {activeTab === "products" && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  placeholder="Product name"
                  className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
                <input
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  placeholder="Price"
                  type="number"
                  step="0.01"
                  className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
                <input
                  value={newProduct.stock_left}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      stock_left: e.target.value,
                    })
                  }
                  placeholder="Stock left"
                  type="number"
                  className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <input
                  value={newProduct.company_name}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      company_name: e.target.value,
                    })
                  }
                  placeholder="Company name"
                  className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <textarea
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description"
                  className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 md:col-span-2"
                  rows="3"
                />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    setImageFiles(Array.from(e.target.files).slice(0, 3))
                  }
                  className="border border-gray-300 p-2 rounded w-full"
                />
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>

              {/* Per-file progress bars */}
              {imageFiles.map((f, i) => (
                <div key={i} className="mt-2">
                  <p className="text-sm">{f.name}</p>
                  <div className="w-full bg-gray-200 rounded h-2">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{
                        width: `${uploadProgress[`image-${i}`] || 0}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
              {videoFile && (
                <div className="mt-2">
                  <p className="text-sm">{videoFile.name}</p>
                  <div className="w-full bg-gray-200 rounded h-2">
                    <div
                      className="bg-blue-500 h-2 rounded"
                      style={{
                        width: `${uploadProgress["video-0"] || 0}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              <button
                onClick={handleAddProduct}
                className="mt-4 bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition"
              >
                Upload & Add Product
              </button>
            </div>

            {/* Products list */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">
                Products ({products.length})
              </h2>
              <div className="space-y-4">
                {products.map((p) => {
                  const imgs = parseImages(p);
                  return (
                    <motion.div
                      key={p.id}
                      className="flex justify-between items-center border-b py-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="flex items-center gap-4">
                        {imgs[0] ? (
                          <img
                            src={imgs[0]}
                            alt={p.name}
                            className="w-14 h-14 object-cover rounded"
                          />
                        ) : (
                          <div className="w-14 h-14 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-gray-400">📦</span>
                          </div>
                        )}
                        <div>
                          <p className="font-semibold">{p.name}</p>
                          <p className="text-sm text-gray-600">${p.price}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
