// pages/products/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/components/CartContext";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products?id=${id}`);
        
        if (!response.ok) throw new Error('Product not found');
        
        const productData = await response.json();
        setProduct(productData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-600"></div>
    </div>
  );

  if (error) return (
    <div className="container mx-auto px-4 py-10 text-center">
      <p className="text-red-500 text-xl">Error: {error}</p>
      <button 
        onClick={() => router.back()}
        className="mt-4 bg-pink-600 text-white px-6 py-2 rounded"
      >
        Go Back
      </button>
    </div>
  );

  if (!product) return <p className="p-8">Product not found</p>;

  // Parse JSON fields if they're stored as strings
  const images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
  const reviews = typeof product.reviews === 'string' ? JSON.parse(product.reviews) : product.reviews;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Media section */}
        <div className="space-y-4">
          <motion.img
            src={images[0]}
            alt={product.name}
            className="rounded-2xl shadow-lg w-full h-96 object-cover"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          />
          
          {images.length > 1 && (
            <div className="grid grid-cols-3 gap-4">
              {images.slice(1).map((img, i) => (
                <motion.img
                  key={i}
                  src={img}
                  alt={product.name}
                  className="rounded-xl shadow-md w-full h-32 object-cover"
                  whileHover={{ scale: 1.05 }}
                />
              ))}
            </div>
          )}
          
          {product.video && (
            <motion.video
              controls
              className="rounded-xl shadow-md w-full"
              whileHover={{ scale: 1.02 }}
            >
              <source src={product.video} type="video/mp4" />
            </motion.video>
          )}
        </div>

        {/* Product details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          
          {/* Price display */}
          <div className="mb-6">
            {product.discounted_price ? (
              <div className="flex items-center gap-4">
                <span className="text-2xl font-semibold text-pink-600">
                  ${product.discounted_price}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${product.price}
                </span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                  Save ${(product.price - product.discounted_price).toFixed(2)}
                </span>
              </div>
            ) : (
              <p className="text-2xl font-semibold text-pink-600">
                ${product.price}
              </p>
            )}
          </div>

          {/* Stock information */}
          <p className={`mb-4 ${product.stock_left > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock_left > 0 ? `${product.stock_left} in stock` : 'Out of stock'}
          </p>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => addToCart(product)}
            disabled={product.stock_left === 0}
            className={`px-6 py-3 rounded-xl shadow transition ${
              product.stock_left > 0 
                ? 'bg-pink-600 text-white hover:bg-pink-700' 
                : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            }`}
          >
            {product.stock_left > 0 ? 'Add to Cart 🛒' : 'Out of Stock'}
          </motion.button>

          {/* Reviews */}
          {reviews && reviews.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
              {reviews.map((r) => (
                <motion.div
                  key={r.id}
                  className="bg-gray-100 p-4 rounded-lg mb-3"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <p className="font-bold">{r.user}</p>
                  <p>{"⭐".repeat(r.rating)}</p>
                  <p>{r.text}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}