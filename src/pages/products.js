import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/CartContext"; // ✅ FIXED: import useCart

// Sample product data with categories and more details
const sampleProducts = [
  {
    id: 1,
    name: "Luxury Face Cream",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Hydrating cream with natural ingredients for radiant skin",
    category: "Skincare",
    rating: 4.8,
    featured: true,
  },
  {
    id: 2,
    name: "Revitalizing Serum",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Anti-aging serum with vitamin C and hyaluronic acid",
    category: "Skincare",
    rating: 4.7,
    featured: true,
  },
  {
    id: 3,
    name: "Gentle Cleanser",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Daily cleanser for all skin types, removes impurities gently",
    category: "Skincare",
    rating: 4.5,
    featured: false,
  },
  {
    id: 4,
    name: "Nourishing Mask",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Weekly treatment mask for deep hydration and nourishment",
    category: "Skincare",
    rating: 4.6,
    featured: false,
  },
  {
    id: 5,
    name: "Luxury Lipstick Set",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Premium lipstick set with 6 long-lasting shades",
    category: "Makeup",
    rating: 4.9,
    featured: true,
  },
  {
    id: 6,
    name: "Volume Mascara",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Lengthening and volumizing mascara for dramatic lashes",
    category: "Makeup",
    rating: 4.4,
    featured: false,
  },
  {
    id: 7,
    name: "Scented Body Lotion",
    price: 36.99,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Luxurious body lotion with delicate floral fragrance",
    category: "Body Care",
    rating: 4.7,
    featured: false,
  },
  {
    id: 8,
    name: "Hair Repair Serum",
    price: 42.99,
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Intensive repair serum for damaged and frizzy hair",
    category: "Hair Care",
    rating: 4.8,
    featured: true,
  },
];

// Extract unique categories
const categories = [...new Set(sampleProducts.map((product) => product.category))];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("featured");

  const { cartItems, removeFromCart, clearCart } = useCart(); // ✅ FIXED
  const [cartOpen, setCartOpen] = useState(false);

  // ✅ FIXED: subtotal calculation
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Simulate data fetching
  useEffect(() => {
    setTimeout(() => {
      setProducts(sampleProducts);
      setFilteredProducts(sampleProducts);
      setLoading(false);
    }, 800);
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((product) => product.category === selectedCategory);
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
  }, [products, searchQuery, selectedCategory, sortOption]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortOption("featured");
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading our luxurious products...</p>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>BeautyCare - Our Products</title>
        <meta
          name="description"
          content="Discover BeautyCare's premium collection of beauty and skincare products"
        />
      </Head>

      {/* Hero Section */}
      <section className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Our Luxury Collection</h1>
          <p>Indulge in our premium beauty products crafted with care ✨</p>
        </motion.div>
      </section>

      {/* Filters and Search */}
     <section className="filters-section">
        <div className="container">
          <div className="filters-grid">
            {/* Search Input */}
            <div className="search-container">
              <div className="search-input">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="filter-group">
              <label>Category</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="filter-group">
              <label>Sort By</label>
              <select 
                value={sortOption} 
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            {/* Reset Filters */}
            <button className="reset-btn" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>

          {/* Results Count */}
          <div className="results-count">
            <p>
              Showing {filteredProducts.length} of {products.length} products
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <div className="container">
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* ✅ Cart Drawer */}
          <AnimatePresence>
            {cartOpen && (
              <motion.div
                className="cart-drawer"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
              >
                <div className="cart-header">
                  <h2>Your Cart</h2>
                  <button onClick={() => setCartOpen(false)}>✖</button>
                </div>
                {cartItems.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  <div>
                    {cartItems.map((item) => (
                      <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} />
                        <div>
                          <h4>{item.name}</h4>
                          <p>
                            ${item.price} × {item.qty}
                          </p>
                        </div>
                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                      </div>
                    ))}
                    <div className="cart-footer">
                      <p>Subtotal: ${subtotal.toFixed(2)}</p>
                      <button onClick={clearCart}>Clear Cart</button>
                      <button className="checkout-btn">Checkout</button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <style jsx>{`
        .loading-container {
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
        }
        .loading-spinner {
          width: 60px;
          height: 60px;
          border: 4px solid rgba(236, 72, 153, 0.2);
          border-radius: 50%;
          border-top-color: #ec4899;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .loading-container p {
          color: #7c2d69;
          font-size: 1.1rem;
        }

        .hero-section {
          background: linear-gradient(135deg, rgba(124, 45, 105, 0.9) 0%, rgba(190, 24, 93, 0.85) 100%), 
                     url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80');
          background-size: cover;
          background-position: center;
          padding: 100px 20px;
          text-align: center;
          color: white;
        }
        .hero-content h1 {
          font-size: 3rem;
          margin-bottom: 16px;
          font-weight: 800;
          text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .hero-content p {
          font-size: 1.3rem;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
          opacity: 0.9;
        }

        .filters-section {
          padding: 40px 0;
          background: #fff;
          border-bottom: 1px solid #f3f4f6;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .filters-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr auto;
          gap: 20px;
          align-items: end;
        }
        .search-container {
          position: relative;
        }
        .search-input {
          display: flex;
          align-items: center;
          background: #f9fafb;
          border-radius: 12px;
          padding: 12px 16px;
          border: 1px solid #e5e7eb;
          transition: all 0.3s ease;
        }
        .search-input:focus-within {
          border-color: #ec4899;
          box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.1);
        }
        .search-input i {
          color: #9ca3af;
          margin-right: 10px;
        }
        .search-input input {
          border: none;
          background: transparent;
          width: 100%;
          font-size: 1rem;
          outline: none;
        }
        .filter-group {
          display: flex;
          flex-direction: column;
        }
        .filter-group label {
          font-weight: 600;
          margin-bottom: 8px;
          color: #374151;
        }
        .filter-group select {
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .filter-group select:focus {
          border-color: #ec4899;
          box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.1);
        }
        .reset-btn {
          padding: 12px 20px;
          background: #f3f4f6;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          color: #4b5563;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .reset-btn:hover {
          background: #e5e7eb;
          color: #374151;
        }
        .results-count {
          margin-top: 20px;
          color: #6b7280;
        }

        .products-section {
          padding: 60px 0;
          background: linear-gradient(to bottom, #fdf2f8 0%, #fce7f3 100%);
          min-height: 50vh;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px; padding: 20px;
        }
        .no-products {
          text-align: center;
          padding: 60px 20px;
          color: #6b7280;
        }
        .no-products i {
          font-size: 3rem;
          color: #d1d5db;
          margin-bottom: 20px;
        }
        .no-products h3 {
          font-size: 1.5rem;
          margin-bottom: 10px;
          color: #374151;
        }
        .no-products button {
          margin-top: 20px;
          padding: 12px 24px;
          background: #ec4899;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .no-products button:hover {
          background: #db2777;
        }

        .cart-drawer {
          position: fixed; top:0; right:0; bottom:0;
          width: 320px; background: white; box-shadow: -2px 0 8px rgba(0,0,0,0.2);
          padding: 20px; overflow-y: auto; z-index: 1000;
        }
        .cart-header { display:flex; justify-content:space-between; align-items:center; }
        .cart-item { display:flex; gap:10px; margin:10px 0; align-items:center; }
        .cart-item img { width:50px; height:50px; object-fit:cover; border-radius:6px; }
        .cart-footer { margin-top:20px; }
        .checkout-btn {
          background:#ec4899; color:white; padding:10px 16px;
          border:none; border-radius:6px; margin-top:10px; width:100%;
        }

        @media (max-width: 968px) {
          .filters-grid {
            grid-template-columns: 1fr 1fr;
            gap: 15px;
          }
          .hero-content h1 {
            font-size: 2.5rem;
          }
          .hero-content p {
            font-size: 1.1rem;
          }
        }
        @media (max-width: 640px) {
          .filters-grid {
            grid-template-columns: 1fr;
          }
          .hero-content h1 {
            font-size: 2rem;
          }
        }

      `}</style>
    </>
  );
}