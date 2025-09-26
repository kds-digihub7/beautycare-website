import { useState } from "react";
import Link from "next/link"; // ✅ import Link for navigation
import { useCart } from "./CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Product Card */}
      <div className="bg-white rounded-xl p-4 shadow-md transition-transform duration-200 flex flex-col justify-between hover:-translate-y-1 relative overflow-hidden">
        {/* ✅ NEW Badge */}
        {product.isNew && (
          <span className="absolute top-3 left-3 z-20 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
            NEW
          </span>
        )}

        {/* ✅ Featured Badge */}
        {product.featured && (
          <span className="absolute top-3 right-3 z-20 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow flex items-center gap-1">
            ⭐ Featured
          </span>
        )}

        {/* Image & Overlay */}
        <div className="relative">
          {/* ✅ Wrap image in Link */}
          <Link href={`/products/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-contain rounded-lg bg-white cursor-pointer"
            />
          </Link>

          <div className="absolute inset-0 flex items-center justify-center bg-pink-500/60 opacity-0 rounded-lg transition-opacity duration-300 hover:opacity-100 z-10">
            <button
              onClick={() => setShowModal(true)}
              className="bg-white text-pink-500 font-semibold px-4 py-2 rounded-full shadow-md hover:bg-gray-100"
            >
              Quick View
            </button>
          </div>
        </div>

        {/* Title */}
        {/* ✅ Wrap title in Link */}
        <Link href={`/products/${product.id}`}>
          <h3 className="mt-3 text-lg font-semibold text-pink-900 cursor-pointer hover:underline">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-500 my-2 flex-grow">
          {product.description}
        </p>

        {/* Footer */}
        <div className="mt-3 flex justify-between items-center">
          <span className="text-pink-500 font-bold text-lg">
            ${product.price}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="bg-pink-500 hover:bg-pink-600 text-white text-sm px-4 py-2 rounded-full shadow-md"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* ✅ Quick View Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg max-w-lg w-full overflow-hidden"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold">{product.name}</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-800 text-xl"
                >
                  ✖
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-contain rounded-lg mb-4"
                />
                <p className="text-gray-600 mb-3">{product.description}</p>
                <p className="text-pink-600 font-bold text-lg mb-4">
                  ${product.price}
                </p>
                <button
                  onClick={() => {
                    addToCart(product);
                    setShowModal(false);
                  }}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg shadow-md"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
