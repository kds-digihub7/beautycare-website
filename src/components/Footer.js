// components/Footer.js - Enhanced with consistent design
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-sections">
            <div className="footer-section">
              <div className="footer-logo">
                <span className="logo-icon">🌸</span>
                <span>BeautyCare</span>
              </div>
              <p>
                Your one-stop destination for premium beauty and self-care products. 
                We're dedicated to helping you look and feel your best.
              </p>
              <div className="social-icons">
                <a href="#" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" aria-label="YouTube">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
            
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/products">Products</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Customer Service</h4>
              <ul>
                <li><a href="#">Shipping Information</a></li>
                <li><a href="#">Returns & Exchanges</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms & Conditions</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Contact Info</h4>
              <ul className="contact-info">
                <li>
                  <i className="fas fa-envelope"></i>
                  info@beautycare.com
                </li>
                <li>
                  <i className="fas fa-phone"></i>
                  +1 (555) 123-4567
                </li>
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  123 Beauty Street, Care City
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {currentYear} BeautyCare. All rights reserved.</p>
        </div>
      </div>
      
      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
          margin-top: auto;
        }
        
        .footer-content {
          padding: 60px 0 30px;
        }
        
        .footer-sections {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
        }
        
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--secondary-dark);
          margin-bottom: 15px;
        }
        
        .footer-logo .logo-icon {
          font-size: 2rem;
        }
        
        .footer-section h4 {
          color: var(--secondary-dark);
          margin-bottom: 20px;
          font-size: 1.2rem;
          position: relative;
          padding-bottom: 10px;
        }
        
        .footer-section h4::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background: var(--secondary);
        }
        
        .footer-section p {
          margin-bottom: 20px;
          line-height: 1.6;
          color: var(--dark);
        }
        
        .footer-section ul {
          list-style: none;
        }
        
        .footer-section ul li {
          margin-bottom: 12px;
        }
        
        .footer-section ul li a {
          color: var(--dark);
          text-decoration: none;
          transition: var(--transition);
        }
        
        .footer-section ul li a:hover {
          color: var(--secondary);
          padding-left: 5px;
        }
        
        .contact-info li {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .contact-info i {
          color: var(--secondary);
          width: 20px;
        }
        
        .social-icons {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }
        
        .social-icons a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: var(--secondary);
          color: white;
          border-radius: 50%;
          transition: var(--transition);
        }
        
        .social-icons a:hover {
          background: var(--secondary-dark);
          transform: translateY(-3px);
        }
        
        .footer-bottom {
          border-top: 1px solid var(--primary-light);
          padding: 20px 0;
          text-align: center;
          color: var(--dark);
        }
        
        @media (max-width: 768px) {
          .footer-content {
            padding: 40px 0 20px;
          }
          
          .footer-sections {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 30px;
          }
          
          .footer-section h4::after {
            left: 50%;
            transform: translateX(-50%);
          }
          
          .contact-info li {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;