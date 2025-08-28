// src/pages/contact.js
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (formData.name && formData.email && formData.message) {
      // Show success message
      alert('Thank you for your message! We will get back to you soon. 🌸');
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <>
      <Head>
        <title>BeautyCare - Contact Us</title>
        <meta name="description" content="Contact BeautyCare" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      <div className="contact-container">
        {/* Navbar */}
        <nav className="navbar">
          <div className="nav-container">
            <Link href="/" className="logo">
              <div className="logo-icon">
                <i className="fas fa-spa"></i>
              </div>
              <span>BeautyCare</span>
            </Link>
            
            <div className="nav-links">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/products">Products</Link>
              <Link href="/contact" className="active">Contact</Link>
            </div>
          </div>
        </nav>

        <div className="container max-width">
          {/* Hero Section */}
          <div className="hero">
            <h1>Contact Us</h1>
            <p>We'd love to hear from you 💌 Get in touch today!</p>
          </div>

          {/* Content */}
          <div className="content">
            {/* Form Container */}
            <div className="form-container">
              <h2>Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                  <label htmlFor="name">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    required
                    rows="5"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="submit-button"
                >
                  Send Message <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>

            {/* Info Container */}
            <div className="info-container">
              <div className="contact-info">
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <span>info@beautycare.com</span>
                </div>
              </div>

              <div className="info-item">
                <h3><i className="fas fa-map-marker-alt"></i> Our Location</h3>
                <p>
                  123 Beauty Street, Cosmetic District<br />
                  New York, NY 10001
                </p>
              </div>

              <div className="info-item">
                <h3><i className="fas fa-clock"></i> Business Hours</h3>
                <p>
                  Monday - Friday: 9am - 8pm<br />
                  Saturday: 10am - 6pm<br />
                  Sunday: 11am - 4pm
                </p>
              </div>

              <div className="info-item">
                <h3><i className="fas fa-info-circle"></i> Quick Support</h3>
                <p>
                  For urgent inquiries, call us directly at<br />
                  <strong>+1 (555) 123-4567</strong><br />
                  or email <strong>support@beautycare.com</strong>
                </p>
              </div>

              <div className="social-links">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-pinterest-p"></i></a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer>
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
        
        html, body {
          height: 100%;
          overflow: hidden;
        }
        
        .contact-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%);
          display: flex;
          flex-direction: column;
          color: #4a4a4a;
          overflow: auto;
        }
        
        /* Navbar */
        .navbar {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          padding: 15px 0;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
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
          gap: 15px;
          font-size: 24px;
          font-weight: 700;
          color: #ec4899;
          text-decoration: none;
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
          transition: color 0.3s ease;
          padding: 5px 10px;
          border-radius: 5px;
        }
        
        .nav-links a:hover {
          color: #ec4899;
          background: rgba(236, 72, 153, 0.1);
        }
        
        .nav-links a.active {
          color: #ec4899;
          background: rgba(236, 72, 153, 0.1);
        }
        
        .max-width {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        /* Hero Section */
        .hero {
          text-align: center;
          margin: 20px 0 30px;
        }
        
        .hero h1 {
          font-size: 2.2rem;
          color: #7c2d69;
          margin-bottom: 15px;
          font-weight: 800;
        }
        
        @media (min-width: 768px) {
          .hero h1 {
            font-size: 2.8rem;
          }
        }
        
        .hero p {
          font-size: 1.1rem;
          color: #9d174d;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        @media (min-width: 768px) {
          .hero p {
            font-size: 1.3rem;
          }
        }
        
        /* Content */
        .content {
          display: flex;
          flex-direction: column;
          gap: 30px;
          margin-bottom: 20px;
          flex: 1;
        }
        
        @media (min-width: 1024px) {
          .content {
            flex-direction: row;
          }
        }
        
        /* Form Container */
        .form-container {
          flex: 1;
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 10px 30px rgba(236, 72, 153, 0.1);
        }
        
        @media (min-width: 768px) {
          .form-container {
            padding: 30px;
          }
        }
        
        .form-container h2 {
          color: #ec4899;
          margin-bottom: 20px;
          text-align: center;
          font-size: 1.6rem;
        }
        
        @media (min-width: 768px) {
          .form-container h2 {
            font-size: 1.8rem;
          }
        }
        
        .form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .form-group label {
          font-weight: 600;
          color: #7c2d69;
          font-size: 0.9rem;
        }
        
        .form-group input,
        .form-group textarea {
          padding: 12px;
          border: 2px solid #fbcfe8;
          border-radius: 10px;
          font-size: 14px;
          transition: all 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #ec4899;
          box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.2);
        }
        
        .form-group textarea {
          min-height: 120px;
          resize: vertical;
        }
        
        .submit-button {
          background: linear-gradient(135deg, #ec4899, #f472b6);
          color: white;
          border: none;
          padding: 14px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(236, 72, 153, 0.3);
          margin-top: 10px;
        }
        
        .submit-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(236, 72, 153, 0.4);
        }
        
        /* Info Container */
        .info-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 15px;
          background: white;
          border-radius: 15px;
          padding: 20px;
          box-shadow: 0 5px 20px rgba(236, 72, 153, 0.1);
        }
        
        @media (min-width: 768px) {
          .contact-info {
            flex-direction: row;
            justify-content: space-around;
          }
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #7c2d69;
        }
        
        .contact-item i {
          font-size: 18px;
          color: #ec4899;
        }
        
        .info-item {
          background: white;
          border-radius: 15px;
          padding: 20px;
          box-shadow: 0 5px 20px rgba(236, 72, 153, 0.1);
          transition: transform 0.3s ease;
        }
        
        .info-item:hover {
          transform: translateY(-3px);
        }
        
        .info-item h3 {
          color: #ec4899;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1.1rem;
        }
        
        .info-item p {
          color: #7c2d69;
          line-height: 1.6;
          font-size: 0.9rem;
        }
        
        .social-links {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-top: 15px;
        }
        
        .social-links a {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ec4899, #f472b6);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          transition: all 0.3s ease;
        }
        
        .social-links a:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(236, 72, 153, 0.4);
        }
        
        /* Footer */
        footer {
          text-align: center;
          padding: 20px 0;
          color: #7c2d69;
          margin-top: auto;
        }
        
        /* Responsive adjustments */
        @media (max-height: 800px) {
          .hero {
            margin: 10px 0 20px;
          }
          
          .hero h1 {
            font-size: 1.8rem;
            margin-bottom: 10px;
          }
          
          .hero p {
            font-size: 1rem;
          }
          
          .form-container, .info-item {
            padding: 15px;
          }
          
          .form-group input,
          .form-group textarea {
            padding: 10px;
          }
          
          .submit-button {
            padding: 12px;
          }
        }
      `}</style>
    </>
  );
}