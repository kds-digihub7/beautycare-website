import { useCart } from "@/components/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function CheckoutPage() {
  const { cartItems, clearCart, removeFromCart } = useCart();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    house: "",
    street: "",
    city: "",
    province: "",
    postal: "",
    landmark: "",
    comments: "",
    payment: "COD",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    nextStep();
  };

  const steps = ["Cart", "Details", "Confirm"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-green-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-8 relative overflow-hidden">
        {/* Progress Bar (Locked) */}
        <div className="flex justify-between mb-8">
          {steps.map((label, index) => {
            const stepIndex = index + 1;
            const isActive = step === stepIndex;
            const isCompleted = step > stepIndex;

            return (
              <button
                key={label}
                onClick={() => {
                  if (isCompleted) setStep(stepIndex);
                }}
                disabled={!isCompleted && !isActive}
                className={`flex-1 text-center font-bold transition ${
                  isActive
                    ? "text-green-600"
                    : isCompleted
                    ? "text-gray-500 line-through"
                    : "text-gray-300 cursor-not-allowed"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1 - Cart Review */}
          {step === 1 && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-6">🛒 Review Your Cart</h2>
              {cartItems.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center bg-gray-50 p-4 rounded-xl"
                    >
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-gray-500">
                          ${item.price} × {item.qty}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="mt-6 flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextStep}
                    className="w-full bg-green-600 text-white py-3 rounded-xl mt-6"
                  >
                    Proceed to Details →
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 2 - Form */}
          {step === 2 && (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold mb-6">📋 Enter Details</h2>

              {/* Personal Info */}
              <input
                type="text"
                placeholder="Full Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl"
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl"
              />
              <input
                type="tel"
                placeholder="Phone"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl"
              />

              {/* Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="House No."
                  value={form.house}
                  onChange={(e) => setForm({ ...form, house: e.target.value })}
                  className="px-4 py-3 border rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Street"
                  value={form.street}
                  onChange={(e) => setForm({ ...form, street: e.target.value })}
                  className="px-4 py-3 border rounded-xl"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="px-4 py-3 border rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Province"
                  value={form.province}
                  onChange={(e) => setForm({ ...form, province: e.target.value })}
                  className="px-4 py-3 border rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={form.postal}
                  onChange={(e) => setForm({ ...form, postal: e.target.value })}
                  className="px-4 py-3 border rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Landmark"
                  value={form.landmark}
                  onChange={(e) =>
                    setForm({ ...form, landmark: e.target.value })
                  }
                  className="px-4 py-3 border rounded-xl"
                />
              </div>
              <textarea
                placeholder="Additional Comments"
                value={form.comments}
                onChange={(e) =>
                  setForm({ ...form, comments: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-xl"
                rows="2"
              />

              {/* Payment Method */}
              <div className="flex gap-4">
                {["COD", "Partial", "Online"].map((method) => (
                  <label
                    key={method}
                    className={`px-4 py-2 rounded-xl border cursor-pointer ${
                      form.payment === method
                        ? "bg-green-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={form.payment === method}
                      onChange={(e) =>
                        setForm({ ...form, payment: e.target.value })
                      }
                      className="hidden"
                    />
                    {method}
                  </label>
                ))}
              </div>

              {/* Conditional Card Details */}
              {(form.payment === "Partial" || form.payment === "Online") && (
                <div className="space-y-4 mt-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    required
                    value={form.cardNumber}
                    onChange={(e) =>
                      setForm({ ...form, cardNumber: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-xl"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Expiry (MM/YY)"
                      required
                      value={form.expiry}
                      onChange={(e) =>
                        setForm({ ...form, expiry: e.target.value })
                      }
                      className="px-4 py-3 border rounded-xl"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      required
                      value={form.cvv}
                      onChange={(e) =>
                        setForm({ ...form, cvv: e.target.value })
                      }
                      className="px-4 py-3 border rounded-xl"
                    />
                  </div>

                  {form.payment === "Partial" && (
                    <p className="text-sm text-gray-600">
                      ⚡ You will be charged <b>40%</b> now = $
                      {(subtotal * 0.4).toFixed(2)}. Remaining on delivery.
                    </p>
                  )}
                  {form.payment === "Online" && (
                    <p className="text-sm text-gray-600">
                      💳 You will be charged the full amount = $
                      {subtotal.toFixed(2)}.
                    </p>
                  )}
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-between">
                <motion.button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 bg-gray-200 rounded-xl"
                  whileTap={{ scale: 0.95 }}
                >
                  ← Back
                </motion.button>
                <motion.button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white rounded-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Place Order
                </motion.button>
              </div>
            </motion.form>
          )}

          {/* Step 3 - Confirmation */}
          {step === 3 && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="text-center py-20"
            >
              <h2 className="text-3xl font-bold text-green-600 mb-4">
                🎉 Order Placed!
              </h2>
              <p className="text-gray-600">
                Thank you <span className="font-semibold">{form.name}</span>,
                your order has been received.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
