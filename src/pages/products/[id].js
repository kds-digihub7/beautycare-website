// src/pages/products/[id].js
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import { useState, useEffect, useRef } from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    email: "",
    name: "",
    hideName: false,
    rating: 5,
    comment: "",
  });

  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  const addToCartBtnRef = useRef(null);

  // Observe Add to Cart button
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBar(!entry.isIntersecting);
      },
      { threshold: 1 }
    );

    if (addToCartBtnRef.current) {
      observer.observe(addToCartBtnRef.current);
    }
    return () => {
      if (addToCartBtnRef.current) {
        observer.unobserve(addToCartBtnRef.current);
      }
    };
  }, []);

  // Sticky Header show on scroll
  useEffect(() => {
    const onScroll = () => {
      setShowStickyHeader(window.scrollY > 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fetch reviews
  useEffect(() => {
    if (id) {
      fetch(`/api/reviews/${id}`)
        .then((res) => res.json())
        .then((data) => setReviews(data));
    }
  }, [id]);

  const { data: products = [], isLoading } = useSWR("/api/products", fetcher);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        Loading product...
      </div>
    );
  }

  const product = products.find((p) => p.id == id);
  if (!product) {
    return <div className="p-6">Product not found ❌</div>;
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/reviews/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: id,
        customer_email: newReview.email,
        customer_name: newReview.name,
        hide_name: newReview.hideName,
        rating: newReview.rating,
        comment: newReview.comment,
      }),
    });

    if (res.ok) {
      const added = await res.json();
      setReviews([added, ...reviews]);
      setNewReview({
        email: "",
        name: "",
        hideName: false,
        rating: 5,
        comment: "",
      });
    }
  };

  // Parse images
  let images = [];
  try {
    images = Array.isArray(product.images)
      ? product.images
      : JSON.parse(product.images);
  } catch {
    images = [];
  }

  return (
    <>
      {/* Sticky Header (Mobile Only) */}
      {showStickyHeader && (
        <div className="fixed top-0 left-0 w-full bg-white shadow-md px-4 py-3 text-center font-semibold text-pink-600 md:hidden z-50">
          {product.name}
        </div>
      )}

      <div className="max-w-6xl mx-auto py-6 px-3 sm:px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Left: Swiper Gallery */}
          <div className="w-full">
            <Swiper
              modules={[Navigation, Pagination]}
              pagination={{ clickable: true }}
              navigation
              spaceBetween={15}
              className="rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg"
            >
              {/* Video as first slide */}
              {product.video && (
                <SwiperSlide>
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-[280px] sm:h-[400px] object-contain bg-black rounded-xl sm:rounded-2xl"
                  >
                    <source src={product.video} type="video/mp4" />
                  </video>
                </SwiperSlide>
              )}

              {/* Images */}
              {images.map((img, i) => (
                <SwiperSlide key={i}>
                  <div className="relative w-full h-[280px] sm:h-[400px] bg-black rounded-xl sm:rounded-2xl">
                    <Image
                      src={img}
                      alt={`${product.name} image ${i + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Right: Product Info */}
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600">
              {product.name}
            </h1>
            <p className="mt-3 text-gray-700 text-sm sm:text-base leading-relaxed">
              {product.description}
            </p>
            <p className="mt-4 text-xl sm:text-2xl font-semibold text-pink-500">
              ${product.price}
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                ref={addToCartBtnRef}
                onClick={() => addToCart(product)}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-lg sm:rounded-xl shadow hover:opacity-90 transition"
              >
                🛒 Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(product);
                  router.push("/checkout");
                }}
                className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-lg sm:rounded-xl shadow hover:bg-green-700 transition"
              >
                ⚡ Buy Now
              </button>
            </div>

            {/* Reviews */}
            <div className="mt-8 sm:mt-10">
              <h2 className="text-lg sm:text-xl font-semibold mb-3">
                Customer Reviews
              </h2>
              {reviews.length === 0 && (
                <p className="text-gray-500 text-sm sm:text-base">
                  No reviews yet.
                </p>
              )}
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="border-b py-3 flex flex-col space-y-1 text-sm sm:text-base"
                >
                  <p className="font-semibold">
                    {r.hide_name
                      ? "Anonymous"
                      : r.customer_name || r.customer_email}
                  </p>
                  <p className="text-gray-600">{r.comment}</p>
                  <p className="text-yellow-500">⭐ {r.rating}/5</p>
                </div>
              ))}

              {/* Review Form */}
              <form
                onSubmit={handleReviewSubmit}
                className="mt-5 space-y-3 bg-gray-50 p-4 rounded-lg"
              >
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full border px-3 py-2 rounded text-sm sm:text-base"
                  value={newReview.email}
                  onChange={(e) =>
                    setNewReview({ ...newReview, email: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  className="w-full border px-3 py-2 rounded text-sm sm:text-base"
                  value={newReview.name}
                  onChange={(e) =>
                    setNewReview({ ...newReview, name: e.target.value })
                  }
                />
                <label className="flex items-center space-x-2 text-sm sm:text-base">
                  <input
                    type="checkbox"
                    checked={newReview.hideName}
                    onChange={(e) =>
                      setNewReview({
                        ...newReview,
                        hideName: e.target.checked,
                      })
                    }
                  />
                  <span>Don’t show my name</span>
                </label>
                <select
                  className="w-full border px-3 py-2 rounded text-sm sm:text-base"
                  value={newReview.rating}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      rating: Number(e.target.value),
                    })
                  }
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n} Stars
                    </option>
                  ))}
                </select>
                <textarea
                  placeholder="Write your review..."
                  className="w-full border px-3 py-2 rounded text-sm sm:text-base"
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition text-sm sm:text-base"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Bottom Bar */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md p-4 flex gap-2 md:hidden z-50">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-lg shadow hover:opacity-90 transition text-sm"
          >
            🛒 Add to Cart
          </button>
          <button
            onClick={() => {
              addToCart(product);
              router.push("/checkout");
            }}
            className="flex-1 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition text-sm"
          >
            ⚡ Buy Now
          </button>
        </div>
      )}
    </>
  );
}
