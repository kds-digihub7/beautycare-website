import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);
  const isActive = (path) => router.pathname === path;

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/blogs", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="container">
          <div className="nav-content">
            {/* Logo */}
            <Link href="/" className="logo" onClick={closeMenu}>
              <span className="logo-icon">🌸</span>
              <span>BeautyCare</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex nav-menu">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={isActive(link.href) ? "active" : ""}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Toggle */}
            <button
              className="menu-toggle md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={isMobileMenuOpen ? "open" : ""}></span>
              <span className={isMobileMenuOpen ? "open" : ""}></span>
              <span className={isMobileMenuOpen ? "open" : ""}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4 }}
              className="mobile-menu md:hidden"
            >
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={isActive(link.href) ? "active" : ""}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Page Content - Ensure only one main element exists */}
      <main className="flex-grow pt-20">{children}</main>

      {/* Footer - Only one footer element */}
      <footer className="footer">
        <div className="footer-content container">
          <div className="footer-sections">
            {/* Logo & About */}
            <div className="footer-section">
              <div className="footer-logo">
                <span className="logo-icon">🌸</span>
                <span>BeautyCare</span>
              </div>
              <p>
                Your one-stop destination for premium beauty and self-care
                products. We're dedicated to helping you look and feel your best.
              </p>
              <div className="social-icons">
                {["facebook-f", "instagram", "twitter", "youtube"].map((icon) => (
                  <a key={icon} href="#" aria-label={icon}>
                    <i className={`fab fa-${icon}`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div className="footer-section">
              <h4>Customer Service</h4>
              <ul>
                <li><a href="#">Shipping Information</a></li>
                <li><a href="#">Returns & Exchanges</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms & Conditions</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h4>Contact Info</h4>
              <ul className="contact-info">
                <li><i className="fas fa-envelope"></i> info@beautycare.com</li>
                <li><i className="fas fa-phone"></i> +1 (555) 123-4567</li>
                <li><i className="fas fa-map-marker-alt"></i> 123 Beauty Street, Care City</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} BeautyCare. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
  /* Navbar */
  .navbar {
    position: fixed;
    top: 0; left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    z-index: 1000;
    transition: 0.3s ease;
    padding: 15px 0;
  }
  .navbar.scrolled {
    background: #fff;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    padding: 10px 0;
  }
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  .nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    color: #7c2d69;
  }
  .logo-icon {
    font-size: 1.8rem;
  }

  /* Desktop menu */
  .nav-menu {
    display: flex;
    gap: 25px;
  }
  .nav-menu a {
    color: #333;
    font-weight: 500;
    text-decoration: none;
    position: relative;
    transition: color 0.3s;
  }
  .nav-menu a.active,
  .nav-menu a:hover {
    color: #ec4899;
  }

  /* Hamburger toggle */
  .menu-toggle {
    display: none;
    flex-direction: column;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
  }
  .menu-toggle span {
    width: 26px;
    height: 3px;
    background: #333;
    transition: 0.3s;
  }
  .menu-toggle span.open:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
  }
  .menu-toggle span.open:nth-child(2) {
    opacity: 0;
  }
  .menu-toggle span.open:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
  }

  /* Mobile menu */
  .mobile-menu {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    height: calc(100vh - 70px);
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
    gap: 20px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
  .mobile-menu a {
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
    text-decoration: none;
    transition: color 0.3s;
  }
  .mobile-menu a.active,
  .mobile-menu a:hover {
    color: #ec4899;
  }

  /* Main content */
  main {
    padding-top: 80px; /* Adjusted for fixed navbar */
  }

  /* Footer */
  .footer {
    background: linear-gradient(135deg, #fdf2f8, #fce7f3);
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
    color: #7c2d69;
    margin-bottom: 15px;
  }
  .footer-section h4 {
    margin-bottom: 15px;
    font-size: 1.1rem;
    color: #7c2d69;
  }
  .footer-section p {
    line-height: 1.6;
    margin-bottom: 15px;
    color: #555;
  }
  .footer-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .footer-section ul li {
    margin-bottom: 10px;
  }
  .footer-section ul li a {
    text-decoration: none;
    color: #333;
    transition: color 0.3s;
  }
  .footer-section ul li a:hover {
    color: #ec4899;
  }
  .contact-info {
    color: #333;
  }
  .contact-info li {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }
  .contact-info i {
    margin-right: 8px;
    color: #ec4899;
    width: 16px;
  }
  .social-icons {
    display: flex;
    gap: 10px;
    margin-top: 15px;
  }
  .social-icons a {
    background: #ec4899;
    color: #fff;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s, transform 0.3s;
  }
  .social-icons a:hover {
    background: #d43f82;
    transform: translateY(-2px);
  }
  .footer-bottom {
    border-top: 1px solid #fbcfe8;
    padding: 20px;
    text-align: center;
    color: #555;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .nav-menu {
      display: none; /* hide desktop nav */
    }
    .menu-toggle {
      display: flex; /* show hamburger */
    }
    .footer-sections {
      grid-template-columns: 1fr;
      text-align: center;
    }
    .footer-logo {
      justify-content: center;
    }
    .social-icons {
      justify-content: center;
    }
    .contact-info li {
      justify-content: center;
    }
  }
`}</style>

    </div>
  );
}