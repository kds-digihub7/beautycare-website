import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/CartContext";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Products() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("featured");

  const { cartItems, removeFromCart, clearCart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  // 🔹 Fetch products with SWR (auto refresh every 5s)
  const { data: products = [], error, isLoading } = useSWR(
    "/api/products",
    fetcher,
    { refreshInterval: 5000 } // real-time-ish updates
  );

  // 🔹 Categories generated from actual products
  const categories = ["All", ...new Set(products.map((p) => p.category || "Other"))];

  // 🔹 Filtering + sorting
  useEffect(() => {
    if (!products.length) return;

    let result = [...products].map((p) => {
      let images = [];
      if (Array.isArray(p.images)) {
        images = p.images;
      } else {
        try {
          images = JSON.parse(p.images);
        } catch {
          images = [];
        }
      }
      return {
  id: p.id,
  name: p.name,
  description: p.description,
  price: p.price,
  image: images[0] || "/placeholder.png",
  category: p.category || "Uncategorized",
  rating: p.rating || 4.5,
  featured: p.featured || false,
  isNew: p.created_at && new Date(p.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000),
};
    });

    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.name.localeCompare(b.name);
        });
    }

    setFilteredProducts(result);
    setLoading(false);
  }, [products, searchQuery, selectedCategory, sortOption]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortOption("featured");
  };

  // 🔹 Loading state
  if (loading || isLoading) {
    return (
      <Layout>
        <div className="flex min-h-[80vh] flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-pink-50">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-pink-300 border-t-pink-500 mb-4"></div>
          <p className="text-pink-800 text-lg">Loading our luxurious products...</p>
        </div>
      </Layout>
    );
  }

  // 🔹 Error state
  if (error) {
    return (
      <Layout>
        <div className="flex min-h-[80vh] items-center justify-center text-red-600">
          Failed to load products ❌
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>KO Beauty - Our Products</title>
        <meta
          name="description"
          content="Discover KO Beauty's premium collection of beauty and skincare products"
        />
      </Head>

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center text-white py-24 px-6 text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(124,45,105,0.9),rgba(190,24,93,0.85)), url(https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1600&q=80)`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Our Luxury Collection
          </h1>
          <p className="text-lg md:text-xl opacity-90 leading-relaxed">
            Indulge in our premium beauty products crafted with care ✨
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="py-10 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 items-end">
            {/* Search */}
            <div className="relative">
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-200 transition">
                <i className="fas fa-search text-gray-400 mr-2"></i>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none w-full text-gray-700"
                />
              </div>
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <label className="font-semibold mb-2 text-gray-700">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex flex-col">
              <label className="font-semibold mb-2 text-gray-700">Sort By</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition"
              >
                <option value="featured">Featured</option>
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            {/* Reset */}
            <button
              onClick={resetFilters}
              className="px-5 py-2 rounded-xl bg-gray-100 font-semibold text-gray-600 hover:bg-gray-200 transition"
            >
              Reset Filters
            </button>
          </div>

          <div className="mt-4 text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-14 bg-gradient-to-b from-pink-50 to-pink-100 min-h-[50vh]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* Cart Drawer */}
          <AnimatePresence>
            {cartOpen && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-5 overflow-y-auto z-50"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Your Cart</h2>
                  <button onClick={() => setCartOpen(false)}>✖</button>
                </div>
                {cartItems.length === 0 ? (
                  <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                  <div>
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 border-b border-gray-200 py-2"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-gray-500">
                            ${item.price} × {item.qty}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <div className="mt-4">
                      <p className="font-semibold mb-2">
                        Subtotal: ${subtotal.toFixed(2)}
                      </p>
                      <button
                        onClick={clearCart}
                        className="w-full mb-2 px-4 py-2 rounded bg-gray-100 text-gray-600 font-semibold hover:bg-gray-200"
                      >
                        Clear Cart
                      </button>
                      <button className="w-full px-4 py-2 rounded bg-pink-500 text-white font-semibold hover:bg-pink-600">
                        Checkout
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
