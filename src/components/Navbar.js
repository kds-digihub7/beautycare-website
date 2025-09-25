//src/components/Navbar.js
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "./CartContext";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, removeFromCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
  if (isCartOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}, [isCartOpen]);

  const isActive = (path) => router.pathname === path;

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/blogs", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-white/90 backdrop-blur-md py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-pink-900 font-bold text-xl"
          >
            🌸 <span>KO Beauty</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-pink-500"
                    : "text-gray-700 hover:text-pink-500"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Desktop Cart */}
            <button
              className="relative"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span
              className={`h-0.5 w-6 bg-gray-800 transition ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-gray-800 transition ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-gray-800 transition ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Floating Cart Bubble */}
      {cartItems.length > 0 && (
        <motion.div
          drag
          dragMomentum={false}
          className="md:hidden fixed bottom-20 right-5 z-50 bg-pink-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
          onClick={() => setIsCartOpen(true)}
        >
          <i className="fas fa-shopping-cart text-xl"></i>
          <span className="absolute -top-1 -right-1 bg-white text-pink-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        </motion.div>
      )}

      {/* Mobile Cart Popup */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white w-11/12 max-w-sm rounded-2xl shadow-xl p-5 relative"
            >
              <button
                onClick={() => setIsCartOpen(false)}
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
              <h3 className="font-semibold text-gray-800 mb-4">
                Shopping Cart
              </h3>
              {cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
              ) : (
                <ul className="space-y-3 max-h-64 overflow-y-auto">
                  {cartItems.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <span>{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          ${item.price}
                        </span>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeFromCart(item.id)}
                        >
                          ✕
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-4">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="block w-full bg-pink-500 text-white py-2 rounded-lg text-center hover:bg-pink-600 transition"
                >
                  Go to Cart
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
