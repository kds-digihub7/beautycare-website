// components/Navbar.js - Enhanced with smooth animations
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return router.pathname === path;
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-content">
          {/* Logo */}
          <Link href="/" className="logo">
            <span className="logo-icon">🌸</span>
            <span>BeautyCare</span>
          </Link>

          {/* Menu Links */}
          <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
            <Link 
              href="/" 
              className={isActive('/') ? 'active' : ''}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className={isActive('/products') ? 'active' : ''}
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link 
              href="/about" 
              className={isActive('/about') ? 'active' : ''}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={isActive('/contact') ? 'active' : ''}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="menu-toggle" onClick={toggleMenu}>
            <span className={isOpen ? 'open' : ''}></span>
            <span className={isOpen ? 'open' : ''}></span>
            <span className={isOpen ? 'open' : ''}></span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          transition: var(--transition);
          padding: 15px 0;
        }

        .navbar.scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          padding: 10px 0;
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.8rem;
          font-weight: 700;
          text-decoration: none;
          color: var(--secondary-dark);
          transition: var(--transition);
        }

        .logo:hover {
          transform: scale(1.05);
        }

        .logo-icon {
          font-size: 2rem;
        }

        .nav-menu {
          display: flex;
          gap: 30px;
        }

        .nav-menu a {
          color: var(--dark);
          text-decoration: none;
          font-weight: 500;
          transition: var(--transition);
          position: relative;
          padding: 5px 0;
        }

        .nav-menu a:hover {
          color: var(--secondary);
        }

        .nav-menu a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--secondary);
          transition: width 0.3s ease;
        }

        .nav-menu a:hover::after,
        .nav-menu a.active::after {
          width: 100%;
        }

        .nav-menu a.active {
          color: var(--secondary);
        }

        .menu-toggle {
          display: none;
          flex-direction: column;
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
        }

        .menu-toggle span {
          width: 25px;
          height: 3px;
          background: var(--dark);
          margin: 3px 0;
          transition: 0.3s;
          border-radius: 2px;
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

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .menu-toggle {
            display: flex;
          }
          
          .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            background: white;
            width: 100%;
            height: calc(100vh - 70px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 50px;
            transition: 0.5s;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            gap: 30px;
          }
          
          .nav-menu.active {
            left: 0;
          }
          
          .nav-menu a {
            font-size: 1.2rem;
            padding: 10px 20px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;