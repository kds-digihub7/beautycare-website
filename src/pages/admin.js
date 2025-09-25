import React from "react";
import { motion } from "framer-motion";

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
  const [imageFiles, setImageFiles] = React.useState([]); // multiple images
  const [videoFile, setVideoFile] = React.useState(null); // single video
  const [admin, setAdmin] = React.useState(null);
  const [creds, setCreds] = React.useState({ email: "", password: "" });

  React.useEffect(() => {
    checkAdmin();
    fetchProducts();
    fetchOrders();
  }, []);

  async function checkAdmin() {
    try {
      const r = await fetch("/api/admin/me", {
        credentials: "include",
      });
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
        headers: {
          "Content-Type": "application/json",
        },
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

  async function uploadFiles(files) {
  const fd = new FormData();
  for (const f of files) {
    fd.append("file", f); // multiple files
  }
  const r = await fetch("/api/upload", {
    method: "POST",
    body: fd,
  });

  if (!r.ok) {
    const error = await r.json();
    throw new Error(error.error || "Upload failed");
  }

  const j = await r.json();
  return j.urls; // now matches backend
}

  async function handleAddProduct() {
    try {
      if (!newProduct.name || !newProduct.price) {
        alert("Name and price are required");
        return;
      }

      let imageUrls = [];
      let videoUrl = "";

      if (imageFiles.length > 0) {
        imageUrls = await uploadFiles(imageFiles);
      }

      if (videoFile) {
        const urls = await uploadFiles([videoFile]);
        videoUrl = urls[0];
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
        headers: {
          "Content-Type": "application/json",
        },
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

      alert("Product added successfully");
    } catch (e) {
      console.error("Error adding product:", e);
      alert("Error adding product: " + e.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const r = await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (r.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        alert("Product deleted successfully");
      } else {
        const error = await r.json();
        throw new Error(error.error || "Delete failed");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting product: " + error.message);
    }
  }

  function handleLogout() {
    setAdmin(null);
    setCreds({ email: "", password: "" });
    document.cookie =
      "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
        <div>
          <h1 className="text-2xl font-bold">Admin ⚙️</h1>
          <p className="text-sm text-gray-300 mt-1">Welcome, {admin.email}</p>
        </div>

        <nav className="space-y-2">
          <button
            className={`block w-full text-left px-4 py-2 rounded transition ${
              activeTab === "products"
                ? "bg-pink-600"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("products")}
          >
            📦 Products
          </button>
          <button
            className={`block w-full text-left px-4 py-2 rounded transition ${
              activeTab === "orders"
                ? "bg-pink-600"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            🛒 Orders
          </button>
          <button
            className={`block w-full text-left px-4 py-2 rounded transition ${
              activeTab === "settings"
                ? "bg-pink-600"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            ⚙️ Settings
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload up to 3 Images
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      setImageFiles(Array.from(e.target.files).slice(0, 3))
                    }
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Video
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files[0])}
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </div>
              </div>

              <button
                onClick={handleAddProduct}
                className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition"
              >
                Upload & Add Product
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">
                Products ({products.length})
              </h2>
              <div className="space-y-4">
                {products.map((p) => {
                  const productImages = parseImages(p);
                  return (
                    <motion.div
                      key={p.id}
                      className="flex justify-between items-center border-b border-gray-200 py-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="flex items-center gap-4">
                        {productImages[0] ? (
                          <img
                            src={productImages[0]}
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
                          <p className="text-xs text-gray-500">
                            Stock: {p.stock_left || 0}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        Delete
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">
              Orders ({orders.length})
            </h2>
            <div className="space-y-4">
              {orders.map((o) => (
                <div
                  key={o.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold">Order #{o.id}</p>
                      <p className="text-sm text-gray-600">
                        Customer: {o.customer_name || o.email}
                      </p>
                      <p className="text-sm">Total: ${o.total}</p>
                      <p className="text-sm">
                        Status:{" "}
                        <span
                          className={`font-medium ${
                            o.tracking_status === "delivered"
                              ? "text-green-600"
                              : o.tracking_status === "cancelled"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {o.tracking_status || "pending"}
                        </span>
                      </p>
                    </div>
                    <select
                      value={o.tracking_status || "processing"}
                      onChange={(e) =>
                        updateOrderStatus(o.id, e.target.value)
                      }
                      className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="out_for_delivery">
                        Out for delivery
                      </option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <p className="text-gray-600">
              Configure payment gateways, coupons, and other settings (future
              implementation).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
