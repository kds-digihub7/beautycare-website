// pages/order-tracking.js
import { useState } from "react";
import { motion } from "framer-motion";

export default function OrderTracking() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState(null);

  const mockStatus = {
    "123": "Shipped 🚚",
    "456": "Processing ⏳",
    "789": "Delivered ✅",
  };

  const handleTrack = () => {
    setStatus(mockStatus[orderId] || "Order not found ❌");
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Track Your Order 📦</h1>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full"
        />
        <button
          onClick={handleTrack}
          className="bg-pink-600 text-white px-6 py-2 rounded-lg"
        >
          Track
        </button>
      </div>

      {status && (
        <motion.div
          className="mt-6 p-4 bg-gray-100 rounded-lg shadow text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {status}
        </motion.div>
      )}
    </div>
  );
}
