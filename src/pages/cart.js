//src/pages/cart.js
import { useCart } from "@/components/CartContext";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <img
            src="/empty-cart.svg"
            alt="Empty cart"
            className="w-40 mx-auto mb-6"
          />
          <h2 className="text-2xl font-bold text-gray-700 mb-3">
            Your cart is empty
          </h2>
          <Link
            href="/products"
            className="px-6 py-3 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition"
          >
            🛒 Add Products to Your Cart
          </Link>
        </motion.div>
      </div>
    );
  }

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl p-8"
      >
        <h1 className="text-3xl font-extrabold text-pink-700 mb-8 text-center">
          🛍️ Your Shopping Cart
        </h1>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between bg-white/90 backdrop-blur-sm shadow-md rounded-xl p-5 transition"
            >
              <div className="flex items-center gap-5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover shadow"
                />
                <div>
                  <p className="font-semibold text-lg text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-gray-500">
                    ${item.price} × {item.qty}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-3 py-1.5 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
              >
                Remove
              </button>
            </motion.div>
          ))}

          {/* Subtotal Section */}
          <div className="mt-8 p-6 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between">
            <p className="text-xl font-bold mb-4 md:mb-0">
              Subtotal: ${subtotal.toFixed(2)}
            </p>
            <div className="flex gap-4">
              <button
                onClick={clearCart}
                className="px-5 py-2 bg-white/30 backdrop-blur-md rounded-lg font-medium hover:bg-white/50 transition"
              >
                Clear
              </button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => router.push("/checkout")}
                className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg"
              >
                Proceed to Checkout
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
