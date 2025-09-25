//src/components/ProductCard.js
import { useCart } from "./CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl p-4 shadow-md transition-transform duration-200 flex flex-col justify-between hover:-translate-y-1">
      {/* Image & Overlay */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-pink-500/60 opacity-0 rounded-lg transition-opacity duration-300 hover:opacity-100">
          <button className="bg-white text-pink-500 font-semibold px-4 py-2 rounded-full shadow-md hover:bg-gray-100">
            Quick View
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-3 text-lg font-semibold text-pink-900">
        {product.name}
      </h3>

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
  );
}
