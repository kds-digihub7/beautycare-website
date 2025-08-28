import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

const Layout = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <Link href="/" className="logo">
            <div className="logo-icon">
              <i className="fas fa-spa"></i>
            </div>
            <span>BeautyCare</span>
          </Link>

          <div className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </Link>
            <Link href="/products" onClick={() => setIsMobileMenuOpen(false)}>
              Products
            </Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </Link>
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <main>{children}</main>

      <style jsx>{`
        /* Navbar Styles */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 15px 0;
          z-index: 1000;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .navbar.scrolled {
          padding: 10px 0;
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 24px;
          font-weight: 700;
          color: #ec4899;
          text-decoration: none;
          transition: transform 0.3s ease;
        }

        .logo:hover {
          transform: scale(1.05);
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #ec4899, #f472b6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .nav-links {
          display: flex;
          gap: 30px;
        }

        .nav-links a {
          color: #7c2d69;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          padding: 8px 0;
          position: relative;
        }

        .nav-links a:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(135deg, #ec4899, #f472b6);
          transition: width 0.3s ease;
        }

        .nav-links a:hover {
          color: #ec4899;
        }

        .nav-links a:hover:after {
          width: 100%;
        }

        .mobile-menu-toggle {
          display: none;
          flex-direction: column;
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
        }

        .mobile-menu-toggle span {
          width: 25px;
          height: 3px;
          background: #7c2d69;
          margin: 3px 0;
          transition: 0.3s;
          border-radius: 2px;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .mobile-menu-toggle {
            display: flex;
          }

          .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 20px;
            gap: 15px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
          }

          .nav-links.active {
            transform: translateY(0);
            opacity: 1;
          }

          .nav-links a {
            padding: 12px;
            border-radius: 5px;
          }

          .nav-links a:hover {
            background: rgba(236, 72, 153, 0.1);
          }
        }
      `}</style>
    </>
  );
};

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <div className="image-placeholder">
          <i className="fas fa-spa"></i>
        </div>
        <div className="product-overlay">
          <button className="quick-view-btn">Quick View</button>
        </div>
      </div>
      <h3>{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <div className="product-footer">
        <span className="product-price">${product.price}</span>
        <button className="add-to-cart-btn">
          <i className="fas fa-shopping-cart"></i> Add to Cart
        </button>
      </div>

      <style jsx>{`
        .product-card {
          background: white;
          border-radius: 15px;
          padding: 20px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }

        .product-image {
          height: 200px;
          background: linear-gradient(135deg, #fce7f3, #fbcfe8);
          border-radius: 10px;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .image-placeholder {
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ec4899;
          font-size: 2rem;
        }

        .product-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(236, 72, 153, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .product-card:hover .product-overlay {
          opacity: 1;
        }

        .quick-view-btn {
          background: white;
          color: #ec4899;
          border: none;
          padding: 10px 20px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .quick-view-btn:hover {
          transform: scale(1.05);
        }

        .product-card h3 {
          font-size: 18px;
          color: #7c2d69;
          margin-bottom: 10px;
        }

        .product-description {
          color: #9d174d;
          margin-bottom: 15px;
          font-size: 14px;
          line-height: 1.5;
        }

        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .product-price {
          font-size: 18px;
          font-weight: 700;
          color: #7c2d69;
        }

        .add-to-cart-btn {
          background: #ec4899;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 20px;
          cursor: pointer;
          font-weight: 500;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: all 0.3s ease;
        }

        .add-to-cart-btn:hover {
          background: #db2777;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Hydrating Face Cream",
      description: "Deeply moisturizes and nourishes your skin",
      price: 25.99,
      image: "/images/face-cream.jpg",
    },
    {
      id: 2,
      name: "Vitamin C Serum",
      description: "Brightens and evens out skin tone",
      price: 34.99,
      image: "/images/serum.jpg",
    },
    {
      id: 3,
      name: "Matte Lipstick",
      description: "Long-lasting color with a velvety finish",
      price: 18.99,
      image: "/images/lipstick.jpg",
    },
    {
      id: 4,
      name: "Daily Moisturizer",
      description: "Lightweight hydration for everyday use",
      price: 22.99,
      image: "/images/moisturizer.jpg",
    },
  ];

  return (
    <Layout>
      <Head>
        <title>BeautyCare - Home</title>
        <meta
          name="description"
          content="Discover the best beauty and self-care products"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </Head>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Your Natural Beauty</h1>
          <p>
            Premium skincare and beauty products crafted with natural
            ingredients for your self-care routine.
          </p>
          <div className="hero-buttons">
            <Link href="/products" className="btn primary">
              Shop Now
            </Link>
            <Link href="/about" className="btn secondary">
              Learn More
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-product">
            <div className="product-circle">
              <i className="fas fa-spa"></i>
            </div>
          </div>
          <div className="floating-product delay-1">
            <div className="product-circle">
              <i className="fas fa-cube"></i>
            </div>
          </div>
          <div className="floating-product delay-2">
            <div className="product-circle">
              <i className="fas fa-gem"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <p>Our most loved beauty essentials</p>
          </div>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="center-button">
            <Link href="/products" className="btn primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Us</h2>
            <p>We're committed to your beauty and wellness</p>
          </div>
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">🌿</div>
              <h3>Natural Ingredients</h3>
              <p>
                Our products are made with natural, sustainably sourced
                ingredients.
              </p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">✨</div>
              <h3>Premium Quality</h3>
              <p>
                We ensure the highest quality standards in all our products.
              </p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🚚</div>
              <h3>Free Shipping</h3>
              <p>Enjoy free shipping on all orders over $50.</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">💖</div>
              <h3>Cruelty-Free</h3>
              <p>
                All our products are cruelty-free and never tested on animals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Global Styles */
        :root {
          --primary: #db2777; /* darker pink */
          --primary-light: #f9a8d4;
          --secondary: #6b214d;
          --light: #fdf2f8;
          --white: #ffffff;
          --text: #3a3a3a;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          color: var(--text);
          line-height: 1.6;
          overflow-x: hidden;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        section {
          padding: 80px 0;
        }

        /* Hero Section */
        .hero {
          min-height: 100vh;
          background: linear-gradient(
              135deg,
              rgba(255, 182, 193, 0.8),
              rgba(255, 182, 193, 0.8)
            ),
            url("/images/hero-bg.jpg");
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          position: relative;
          padding: 100px 0 60px;
          overflow: hidden;
        }

        .hero-content {
          max-width: 600px;
          padding: 0 20px;
          z-index: 2;
        }

        .hero-content h1 {
          font-size: 3.5rem;
          margin-bottom: 20px;
          color: var(--secondary);
          font-weight: 800;
        }

        .hero-content p {
          font-size: 1.2rem;
          margin-bottom: 30px;
          color: var(--secondary);
        }

        .hero-buttons {
          display: flex;
          gap: 15px;
        }

        .btn {
          padding: 12px 30px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .btn.primary {
          background: var(--primary);
          color: white;
          box-shadow: 0 4px 10px rgba(236, 72, 153, 0.3);
        }

        .btn.primary:hover {
          background: #db2777;
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(236, 72, 153, 0.4);
        }

        .btn.secondary {
          background: transparent;
          color: var(--secondary);
          border: 2px solid var(--primary);
        }

        .btn.secondary:hover {
          background: var(--primary);
          color: white;
          transform: translateY(-3px);
        }

        .hero-visual {
          position: absolute;
          right: 10%;
          top: 50%;
          transform: translateY(-50%);
          width: 400px;
          height: 400px;
        }

        .floating-product {
          position: absolute;
          animation: float 5s ease-in-out infinite;
        }

        .floating-product.delay-1 {
          animation-delay: 1.5s;
          top: 20%;
          right: 10%;
        }

        .floating-product.delay-2 {
          animation-delay: 2.5s;
          bottom: 20%;
          right: 30%;
        }

        .product-circle {
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: var(--primary);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        /* Featured Products */
        .featured-products {
          background: var(--white);
        }

        .section-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .section-header h2 {
          font-size: 2.5rem;
          color: var(--secondary);
          margin-bottom: 15px;
        }

        .section-header p {
          font-size: 1.1rem;
          color: var(--text);
          max-width: 600px;
          margin: 0 auto;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-bottom: 50px;
        }

        .center-button {
          text-align: center;
        }

        /* Benefits Section */
        .benefits {
          background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
        }

        .benefit-item {
          text-align: center;
          padding: 40px 30px;
          background: var(--white);
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .benefit-item:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
        }

        .benefit-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .benefit-item h3 {
          margin-bottom: 15px;
          color: var(--secondary);
          font-size: 1.3rem;
        }

        /* Newsletter Section */
        .newsletter {
          background: linear-gradient(135deg, #ec4899, #f472b6);
          color: white;
          text-align: center;
        }

        .newsletter-content h2 {
          font-size: 2.2rem;
          margin-bottom: 15px;
        }

        .newsletter-content p {
          margin-bottom: 30px;
          font-size: 1.1rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .newsletter-form {
          display: flex;
          max-width: 500px;
          margin: 0 auto;
        }

        .newsletter-form input {
          flex: 1;
          padding: 15px 20px;
          border: none;
          border-radius: 30px 0 0 30px;
          font-size: 1rem;
        }

        .newsletter-form button {
          padding: 15px 30px;
          background: var(--secondary);
          color: white;
          border: none;
          border-radius: 0 30px 30px 0;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .newsletter-form button:hover {
          background: #5a2257;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .hero-content h1 {
            font-size: 2.8rem;
          }

          .hero-visual {
            right: 5%;
            width: 300px;
            height: 300px;
          }
        }

        @media (max-width: 768px) {
          .hero {
            text-align: center;
            padding: 120px 0 60px;
          }

          .hero-content {
            margin: 0 auto;
          }

          .hero-content h1 {
            font-size: 2.3rem;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }

          .hero-visual {
            display: none;
          }

          .benefits-grid,
          .products-grid {
            grid-template-columns: 1fr;
          }

          .newsletter-form {
            flex-direction: column;
            gap: 15px;
          }

          .newsletter-form input,
          .newsletter-form button {
            border-radius: 30px;
            width: 100%;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Home;
