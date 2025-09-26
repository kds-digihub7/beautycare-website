// src/pages/index.js
import Head from "next/head";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  // 🔹 Fetch products from API
  const { data: products = [], error, isLoading } = useSWR("/api/products", fetcher);

  // 🔹 Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-pink-300 border-t-pink-500"></div>
        <p className="ml-3 text-pink-700 font-medium">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-red-600">
        Failed to load products ❌
      </div>
    );
  }

  // 🔹 Parse product images safely
  const parsedProducts = products.map((p) => {
    let images = [];
    if (Array.isArray(p.images)) {
      images = p.images;
    } else {
      try {
        images = JSON.parse(p.images);
      } catch {
        images = [];
      }
    }
    return {
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      image: images[0] || "/placeholder.png",
      category: p.category || "Uncategorized",
      rating: p.rating || 4.5,
      featured: p.featured || false,
      created_at: p.created_at,
    };
  });

  // 🔹 Featured, Top Selling, New Products
  const featuredProducts = parsedProducts.filter((p) => p.featured).slice(0, 6);
  const topSelling = parsedProducts.slice(0, 3); // You can change sorting logic
  const newProducts = parsedProducts
    .filter((p) => p.created_at)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 6);

  // 🔹 Benefits (static)
  const benefits = [
    { icon: "🌸", title: "Natural Ingredients", description: "Crafted with the finest natural ingredients." },
    { icon: "✨", title: "Visible Results", description: "Noticeable improvements in skin’s texture." },
    { icon: "💚", title: "Cruelty-Free", description: "We never test on animals." },
  ];

  return (
    <>
      <Head>
        <title>KO Beauty - Premium Skincare & Beauty Products</title>
        <meta name="description" content="Discover premium skincare and beauty products crafted with care." />
      </Head>

      {/* Hero Banner (Swiper) */}
      <section className="relative h-[80vh] sm:h-[90vh] w-full">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          loop
          className="h-full"
        >
          {topSelling.map((product) => (
            <SwiperSlide key={product.id}>
              <div
                className="h-full flex flex-col items-center justify-center text-center text-white px-6 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(124,45,105,0.7), rgba(124,45,105,0.7)), url(${product.image})`,
                }}
              >
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-3xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-lg"
                >
                  {product.name}
                </motion.h1>
                <p className="mt-4 text-base sm:text-lg md:text-xl opacity-90 max-w-xl mx-auto">
                  {product.description}
                </p>
                <div className="mt-6 flex gap-4 justify-center">
                  <Link href={`/products/${product.id}`}>
                    <span className="px-6 sm:px-8 py-3 rounded-full bg-pink-500 text-white font-semibold hover:bg-pink-600 transition">
                      Shop Now
                    </span>
                  </Link>
                  <Link href="/products">
                    <span className="px-6 sm:px-8 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-pink-600 transition">
                      View All
                    </span>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* New Products Section */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-3xl sm:text-4xl font-bold text-pink-800 mb-12">
            New Arrivals
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {newProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 sm:py-24 bg-pink-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.h2
            className="text-center text-3xl sm:text-4xl font-bold text-pink-800 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Why Choose KO Beauty?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md text-center hover:shadow-lg transition"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl sm:text-5xl mb-3">{benefit.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-pink-700 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.h2 className="text-center text-3xl sm:text-4xl font-bold text-pink-800 mb-6">
            Featured Products
          </motion.h2>
          <p className="text-center text-pink-600 mb-12 max-w-xl mx-auto text-sm sm:text-base">
            Discover our most loved beauty essentials
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/products">
              <span className="inline-block px-8 py-3 rounded-full border-2 border-pink-500 text-pink-500 font-semibold hover:bg-pink-500 hover:text-white transition">
                View All Products
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Top Selling Section */}
      <section className="py-20 sm:py-24 bg-pink-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-3xl sm:text-4xl font-bold text-pink-800 mb-12">
            Top Selling
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {topSelling.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      
    </>
  );
}
