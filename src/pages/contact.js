import { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      if (formData.name && formData.email && formData.message) {
        alert("Thank you for your message! We will get back to you soon. 🌸");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("Please fill in all required fields.");
      }
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      <Head>
        <title>KO Beauty - Contact Us</title>
        <meta
          name="description"
          content="Get in touch with KO Beauty for premium beauty products and customer support"
        />
      </Head>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="hero-content"
            >
              <h1>Get in Touch</h1>
              <p>
                We'd love to hear from you 💌 Reach out for any questions or
                feedback!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="contact-form-container"
            >
              <div className="form-header">
                <h2>Send us a Message</h2>
                <p>
                  Fill out the form below and we'll respond as soon as possible
                </p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
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
                    <label htmlFor="email">Your Email *</label>
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
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    required
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  className="submit-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Sending...
                    </>
                  ) : (
                    "Send Message ✨"
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="contact-info"
            >
              <div className="info-header">
                <h2>Contact Information</h2>
                <p>Feel free to reach out through any of these channels</p>
              </div>

              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="info-content">
                    <h3>Phone</h3>
                    <p>+1 (555) 123-4567</p>
                    <span>Mon-Fri, 9am-5pm EST</span>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="info-content">
                    <h3>Email</h3>
                    <p>info@KO Beauty.com</p>
                    <span>We respond within 24 hours</span>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="info-content">
                    <h3>Location</h3>
                    <p>123 Beauty Street</p>
                    <span>Care City, CC 12345</span>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="info-content">
                    <h3>Business Hours</h3>
                    <p>Mon-Fri: 9am - 8pm</p>
                    <span>Sat: 10am - 6pm, Sun: 11am - 4pm</span>
                  </div>
                </div>
              </div>

              <div className="social-section">
                <h3>Follow Us</h3>
                <div className="social-icons">
                  {[
                    "facebook-f",
                    "instagram",
                    "twitter",
                    "pinterest-p",
                    "youtube",
                  ].map((icon) => (
                    <a
                      key={icon}
                      href="#"
                      className="social-icon"
                      aria-label={icon}
                    >
                      <i className={`fab fa-${icon}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero-section {
          position: relative;
          height: 400px;
          background: url("https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80");
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            rgba(124, 45, 105, 0.8),
            rgba(190, 24, 93, 0.7)
          );
        }
        .hero-content {
          position: relative;
          text-align: center;
          color: white;
          padding: 0 20px;
        }
        .hero-content h1 {
          font-size: 3.5rem;
          margin-bottom: 15px;
          font-weight: 800;
        }
        .hero-content p {
          font-size: 1.3rem;
          max-width: 600px;
          margin: 0 auto;
          opacity: 0.9;
        }

        .contact-section {
          padding: 80px 0;
          background: #fdf2f8;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
        }

        .contact-form-container {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }
        .form-header {
          margin-bottom: 30px;
        }
        .form-header h2 {
          font-size: 2rem;
          color: #7c2d69;
          margin-bottom: 10px;
        }
        .form-header p {
          color: #6b7280;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
        }
        .form-group label {
          font-weight: 600;
          margin-bottom: 8px;
          color: #374151;
        }
        .form-group input,
        .form-group textarea {
          padding: 15px 20px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #f9fafb;
        }
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #ec4899;
          box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.1);
          background: white;
        }
        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }
        .submit-btn {
          padding: 16px 32px;
          background: #ec4899;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
          margin-top: 10px;
        }
        .submit-btn:hover:not(:disabled) {
          background: #db2777;
        }
        .submit-btn:disabled {
          opacity: 0.8;
          cursor: not-allowed;
        }
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .contact-info {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          height: fit-content;
        }
        .info-header {
          margin-bottom: 30px;
        }
        .info-header h2 {
          font-size: 2rem;
          color: #7c2d69;
          margin-bottom: 10px;
        }
        .info-header p {
          color: #6b7280;
        }
        .info-items {
          display: flex;
          flex-direction: column;
          gap: 25px;
          margin-bottom: 40px;
        }
        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 15px;
        }
        .info-icon {
          width: 50px;
          height: 50px;
          background: #fdf2f8;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ec4899;
          font-size: 1.2rem;
          flex-shrink: 0;
        }
        .info-content h3 {
          font-size: 1.1rem;
          color: #374151;
          margin-bottom: 5px;
        }
        .info-content p {
          font-weight: 600;
          color: #7c2d69;
          margin-bottom: 3px;
        }
        .info-content span {
          color: #6b7280;
          font-size: 0.9rem;
        }

        .social-section {
          border-top: 1px solid #f3f4f6;
          padding-top: 30px;
        }
        .social-section h3 {
          font-size: 1.2rem;
          color: #374151;
          margin-bottom: 15px;
          text-align: center;
        }
        .social-icons {
          display: flex;
          justify-content: center;
          gap: 12px;
        }
        .social-icon {
          width: 45px;
          height: 45px;
          background: #fdf2f8;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7c2d69;
          font-size: 1.1rem;
          transition: all 0.3s ease;
        }
        .social-icon:hover {
          background: #ec4899;
          color: white;
          transform: translateY(-3px);
        }

        @media (max-width: 968px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
          .hero-content h1 {
            font-size: 2.5rem;
          }
        }
        @media (max-width: 640px) {
          .contact-form-container,
          .contact-info {
            padding: 25px;
          }
          .hero-content h1 {
            font-size: 2rem;
          }
          .hero-content p {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </>
  );
}
