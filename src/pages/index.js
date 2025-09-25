import Head from "next/head";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "Hydrating Face Cream",
      description: "Deeply moisturizes and rejuvenates skin",
      price: 25.99,
      image:
        "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Skincare",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Vitamin C Serum",
      description: "Brightens skin and reduces dark spots",
      price: 34.99,
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Skincare",
      rating: 4.7,
    },
    {
      id: 3,
      name: "Matte Lipstick",
      description: "Velvety finish with long-lasting color",
      price: 18.99,
      image:
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Makeup",
      rating: 4.6,
    },
  ];

  const benefits = [
    {
      icon: "🌸",
      title: "Natural Ingredients",
      description:
        "Our products are crafted with the finest natural ingredients for your skin's health.",
    },
    {
      icon: "✨",
      title: "Visible Results",
      description:
        "Experience noticeable improvements in your skin's texture and appearance.",
    },
    {
      icon: "💚",
      title: "Cruelty-Free",
      description:
        "We never test on animals and are committed to ethical beauty practices.",
    },
  ];

  return (
    <>
      <Head>
        <title>KO Beauty - Premium Skincare & Beauty Products</title>
        <meta
          name="description"
          content="Discover premium skincare and beauty products crafted with care for your natural beauty journey."
        />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-cover bg-center bg-no-repeat text-white"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,45,105,0.7), rgba(124,45,105,0.7)), url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <motion.div
          className="text-center max-w-3xl px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">
            Discover Your Natural Beauty
          </h1>
          <p className="mt-6 text-lg md:text-xl opacity-90">
            Premium skincare & beauty products crafted with care and passion ✨
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/products">
              <motion.span
                className="px-8 py-3 rounded-full bg-pink-500 text-white font-semibold text-lg shadow-md hover:bg-pink-600 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
              </motion.span>
            </Link>
            <Link href="/about">
              <motion.span
                className="px-8 py-3 rounded-full border-2 border-white text-white font-semibold text-lg hover:bg-white hover:text-pink-600 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-pink-50">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-center text-4xl font-bold text-pink-800 mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Why Choose KO Beauty?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-10">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white p-10 rounded-2xl shadow-lg text-center hover:shadow-xl transition"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-pink-700 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-center text-4xl font-bold text-pink-800 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Featured Products
          </motion.h2>
          <motion.p
            className="text-center text-lg text-pink-600 mb-16 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Discover our most loved beauty essentials
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
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

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link href="/products">
              <span className="inline-block px-10 py-4 rounded-full border-2 border-pink-500 text-pink-500 font-semibold hover:bg-pink-500 hover:text-white transition shadow-md">
                View All Products
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-pink-100 to-pink-200 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold text-pink-800 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Join Our Beauty Community
          </motion.h2>
          <p className="text-lg text-pink-700 mb-8">
            Subscribe to our newsletter for exclusive offers, beauty tips, and
            early access to new products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-3 rounded-full shadow-md focus:outline-none"
            />
            <button className="px-8 py-3 bg-pink-500 text-white font-semibold rounded-full shadow-md hover:bg-pink-600 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
