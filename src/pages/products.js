// src/pages/products.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// This is a sample product data - replace with your actual data source
const sampleProducts = [
  {
    id: 1,
    name: 'Luxury Face Cream',
    price: 49.99,
    image: '/images/product1.jpg',
    description: 'Hydrating cream with natural ingredients'
  },
  {
    id: 2,
    name: 'Revitalizing Serum',
    price: 59.99,
    image: '/images/product2.jpg',
    description: 'Anti-aging serum with vitamin C'
  },
  {
    id: 3,
    name: 'Gentle Cleanser',
    price: 29.99,
    image: '/images/product3.jpg',
    description: 'Daily cleanser for all skin types'
  },
  {
    id: 4,
    name: 'Nourishing Mask',
    price: 39.99,
    image: '/images/product4.jpg',
    description: 'Weekly treatment mask for hydration'
  }
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    const fetchProducts = async () => {
      // In a real app, you would fetch from an API
      setProducts(sampleProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>BeautyCare - Our Products</title>
        <meta name="description" content="Discover BeautyCare's premium products" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      <div className="products-page">
        <div className="container">
          {/* Header */}
          <header className="page-header">
            <Link href="/" className="logo">
              <div className="logo-icon">
                <i className="fas fa-spa"></i>
              </div>
              <span>BeautyCare</span>
            </Link>
            
            <nav className="navigation">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </header>

          {/* Hero Section */}
          <div className="hero-section">
            <h1>Our Products</h1>
            <p>Discover our premium collection of beauty products ✨</p>
          </div>

          {/* Products Grid */}
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <div className="image-placeholder">
                    <i className="fas fa-spa"></i>
                  </div>
                </div>
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <span className="product-price">${product.price}</span>
                  <button className="add-to-cart-btn">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <footer className="page-footer">
            <p>© {new Date().getFullYear()} BeautyCare. All rights reserved 🌸</p>
          </footer>
        </div>
      </div>

      <style jsx>{`
        /* Global styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .products-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%);
          padding: 20px;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        /* Loading */
        .loading-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .loading-spinner {
          width: 48px;
          height: 48px;
          border: 3px solid #f472b6;
          border-radius: 50%;
          border-top-color: transparent;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Header */
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          flex-direction: column;
          gap: 20px;
        }
        
        @media (min-width: 768px) {
          .page-header {
            flex-direction: row;
          }
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: 15px;
          font-size: 24px;
          font-weight: 700;
          color: #ec4899;
          text-decoration: none;
        }
        
        .logo-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #ec4899, #f472b6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .navigation {
          display: flex;
          gap: 24px;
        }
        
        .navigation a {
          color: #7c2d69;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        
        .navigation a:hover {
          color: #ec4899;
        }
        
        /* Hero Section */
        .hero-section {
          text-align: center;
          margin-bottom: 60px;
        }
        
        .hero-section h1 {
          font-size: 2.5rem;
          color: #7c2d69;
          margin-bottom: 16px;
          font-weight: 800;
        }
        
        @media (min-width: 768px) {
          .hero-section h1 {
            font-size: 3.5rem;
          }
        }
        
        .hero-section p {
          font-size: 1.2rem;
          color: #9d174d;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        @media (min-width: 768px) {
          .hero-section p {
            font-size: 1.5rem;
          }
        }
        
        /* Products Grid */
        .products-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
          margin-bottom: 60px;
        }
        
        @media (min-width: 640px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        
        .product-card {
          background: white;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
        
        .product-image {
          height: 192px;
          background-color: #fce7f3;
          border-radius: 12px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .image-placeholder {
          width: 96px;
          height: 96px;
          background-color: #fbcfe8;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ec4899;
          font-size: 2rem;
        }
        
        .product-card h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #7c2d69;
          margin-bottom: 8px;
        }
        
        .product-description {
          color: #9d174d;
          margin-bottom: 16px;
          flex-grow: 1;
        }
        
        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .product-price {
          font-size: 1.25rem;
          font-weight: 700;
          color: #7c2d69;
        }
        
        .add-to-cart-btn {
          background: #ec4899;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.3s ease;
        }
        
        .add-to-cart-btn:hover {
          background: #db2777;
        }
        
        /* Footer */
        .page-footer {
          text-align: center;
          padding: 30px 0;
          color: #7c2d69;
        }
      `}</style>
    </>
  );
}