//src/components/Footer.js
import Link from "next/link";

export default function Footer() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/blogs", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="bg-gradient-to-r from-pink-50 to-pink-100 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-2 text-pink-900 font-bold text-xl mb-3">
            🌸 <span>KO Beauty</span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Your one-stop destination for premium beauty and self-care products.
          </p>
          <div className="flex gap-3 mt-4">
            {["facebook-f", "instagram", "twitter", "youtube"].map((icon) => (
              <a
                key={icon}
                href="#"
                className="bg-pink-500 text-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-pink-600 transition"
              >
                <i className={`fab fa-${icon}`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-pink-900 font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-700 hover:text-pink-500 text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-pink-900 font-semibold mb-3">
            Customer Service
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-pink-500">
                Shipping Information
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-500">
                Returns & Exchanges
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-500">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-500">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-pink-900 font-semibold mb-3">Contact Info</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <i className="fas fa-envelope text-pink-500 mr-2"></i>
              subhansuunnyproducts@gmail.com
            </li>
            <li>
              <i className="fas fa-phone text-pink-500 mr-2"></i>
              +92 3297159055
            </li>
            <li>
              <i className="fas fa-map-marker-alt text-pink-500 mr-2"></i>
              Business center Citi housing Sialkot
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-pink-200 py-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} KO Beauty. All rights reserved. Designed by AWK Ltd
      </div>
    </footer>
  );
}
