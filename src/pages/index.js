import Head from "next/head";
import Link from "next/link";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

export default function Home() {
  const featuredProducts = [
    { 
      id: 1, 
      name: "Hydrating Face Cream", 
      description: "Deeply moisturizes and rejuvenates skin", 
      price: 25.99, 
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Skincare",
      rating: 4.8
    },
    { 
      id: 2, 
      name: "Vitamin C Serum", 
      description: "Brightens skin and reduces dark spots", 
      price: 34.99, 
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Skincare",
      rating: 4.7
    },
    { 
      id: 3, 
      name: "Matte Lipstick", 
      description: "Velvety finish with long-lasting color", 
      price: 18.99, 
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Makeup",
      rating: 4.6
    },
  ];

  const benefits = [
    {
      icon: "🌸",
      title: "Natural Ingredients",
      description: "Our products are crafted with the finest natural ingredients for your skin's health."
    },
    {
      icon: "✨",
      title: "Visible Results",
      description: "Experience noticeable improvements in your skin's texture and appearance."
    },
    {
      icon: "💚",
      title: "Cruelty-Free",
      description: "We never test on animals and are committed to ethical beauty practices."
    }
  ];

  return (
    <>
      <Head>
        <title>BeautyCare - Premium Skincare & Beauty Products</title>
        <meta name="description" content="Discover premium skincare and beauty products crafted with care for your natural beauty journey." />
      </Head>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="container">
            <motion.div 
              className="hero-content"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1>Discover Your Natural Beauty</h1>
              <p>Premium skincare & beauty products crafted with care and passion ✨</p>
              <div className="buttons">
                <Link href="/products">
                  <motion.span 
                    className="btn primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Shop Now
                  </motion.span>
                </Link>
                <Link href="/about">
                  <motion.span 
                    className="btn secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Why Choose BeautyCare?
          </motion.h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="benefit-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured">
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Featured Products
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Discover our most loved beauty essentials
          </motion.p>
          <div className="products-grid">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="view-all"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link href="/products">
              <span className="view-all-btn">View All Products</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Join Our Beauty Community</h2>
            <p>Subscribe to our newsletter for exclusive offers, beauty tips, and early access to new products.</p>
            <div className="cta-form">
              <input type="email" placeholder="Your email address" />
              <button>Subscribe</button>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        .hero {
          position: relative;
          height: 100vh;
          min-height: 600px;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(rgba(124, 45, 105, 0.7), rgba(124, 45, 105, 0.7)), 
                     url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80');
          background-size: cover;
          background-position: center;
        }
        .hero-content {
          position: relative;
          text-align: center;
          color: white;
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .hero-content h1 {
          font-size: 3.5rem;
          margin-bottom: 20px;
          font-weight: 800;
          text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .hero-content p {
          font-size: 1.4rem;
          margin-bottom: 40px;
          opacity: 0.9;
        }
        .buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn {
          padding: 16px 32px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          display: inline-block;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .btn.primary {
          background: #ec4899;
          color: white;
          box-shadow: 0 4px 14px rgba(236, 72, 153, 0.4);
        }
        .btn.secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }
        .btn.primary:hover {
          background: #db2777;
          transform: translateY(-2px);
        }
        .btn.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .benefits {
          padding: 100px 0;
          background: #fdf2f8;
        }
        .benefits h2 {
          text-align: center;
          font-size: 2.5rem;
          color: #7c2d69;
          margin-bottom: 60px;
          font-weight: 700;
        }
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 40px;
        }
        .benefit-card {
          text-align: center;
          padding: 40px 30px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }
        .benefit-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
        }
        .benefit-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }
        .benefit-card h3 {
          font-size: 1.5rem;
          color: #7c2d69;
          margin-bottom: 15px;
        }
        .benefit-card p {
          color: #6b7280;
          line-height: 1.6;
        }

        .featured {
          padding: 100px 0;
          background: white;
        }
        .featured h2 {
          text-align: center;
          font-size: 2.5rem;
          color: #7c2d69;
          margin-bottom: 15px;
          font-weight: 700;
        }
        .section-subtitle {
          text-align: center;
          font-size: 1.2rem;
          color: #9d174d;
          margin-bottom: 60px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-bottom: 50px;
        }
        .view-all {
          text-align: center;
        }
        .view-all-btn {
          display: inline-block;
          padding: 16px 40px;
          background: transparent;
          color: #ec4899;
          border: 2px solid #ec4899;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .view-all-btn:hover {
          background: #ec4899;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(236, 72, 153, 0.4);
        }

        .cta {
          padding: 100px 0;
          background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%);
          text-align: center;
        }
        .cta-content {
          max-width: 600px;
          margin: 0 auto;
        }
        .cta-content h2 {
          font-size: 2.5rem;
          color: #7c2d69;
          margin-bottom: 20px;
          font-weight: 700;
        }
        .cta-content p {
          font-size: 1.2rem;
          color: #9d174d;
          margin-bottom: 40px;
          line-height: 1.6;
        }
        .cta-form {
          display: flex;
          gap: 10px;
          max-width: 500px;
          margin: 0 auto;
        }
        .cta-form input {
          flex: 1;
          padding: 16px 20px;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          outline: none;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .cta-form button {
          padding: 16px 30px;
          background: #ec4899;
          color: white;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 14px rgba(236, 72, 153, 0.4);
        }
        .cta-form button:hover {
          background: #db2777;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 2.5rem;
          }
          .hero-content p {
            font-size: 1.1rem;
          }
          .buttons {
            flex-direction: column;
            align-items: center;
          }
          .cta-form {
            flex-direction: column;
          }
          .benefits, .featured, .cta {
            padding: 60px 0;
          }
        }
      `}</style>
    </>
  );
}