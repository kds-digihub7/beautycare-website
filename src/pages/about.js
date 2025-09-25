//src/pages/about.js

import Head from "next/head";
import { motion } from "framer-motion";

export default function About() {
  return (
    <>
      <Head>
        <title>KO Beauty - About Us</title>
        <meta name="description" content="Learn about KO Beauty" />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-800/80 to-pink-500/80 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
          }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-28 md:py-40">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold drop-shadow-lg"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-4 text-lg md:text-2xl font-light max-w-2xl"
          >
            Your trusted partner in beauty & self-care ✨
          </motion.p>
        </div>
      </section>

      {/* About Sections */}
      <section className="max-w-7xl mx-auto px-6 py-20 space-y-24">
        {/* Who We Are */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-pink-800 relative pb-3 mb-6">
              Who We Are
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-pink-500 to-pink-800 rounded"></span>
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Welcome to{" "}
              <span className="font-semibold text-pink-600">
                KO Beauty
              </span>
              , your number one source for all beauty products. We're dedicated
              to providing you the very best of beauty care, with an emphasis on{" "}
              <span className="font-semibold text-pink-500">quality</span>,{" "}
              <span className="font-semibold text-pink-500">
                customer service
              </span>
              , and{" "}
              <span className="font-semibold text-pink-500">uniqueness</span>.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
              alt="Luxury beauty products"
              className="w-full h-80 object-cover hover:scale-105 transition-transform"
            />
          </motion.div>
        </motion.div>

        {/* Our Journey */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-10 items-center md:flex-row-reverse"
        >
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-pink-800 relative pb-3 mb-6">
              Our Journey
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-pink-500 to-pink-800 rounded"></span>
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Founded in 2023, KO BeautyKO Beauty has come a long way from its
              beginnings. Our passion for providing the best beauty products
              drove us to start our own business — and today we are proud to be
              a trusted beauty brand.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-lg order-1 md:order-2"
          >
            <img
              src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Beauty journey"
              className="w-full h-80 object-cover hover:scale-105 transition-transform"
            />
          </motion.div>
        </motion.div>

        {/* Our Promise */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-3xl p-10 md:p-16 text-center shadow-xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pink-800 mb-6">
            Our Promise
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg max-w-3xl mx-auto mb-8">
            We hope you enjoy our products as much as we enjoy offering them to
            you. If you have any questions or comments, please don't hesitate to
            contact us.
          </p>
          <div className="italic text-xl text-pink-700">
            <strong>Sincerely,</strong>
            <br />
            The KO BeautyKO Beauty Team 🌸
          </div>
        </motion.div>
      </section>
    </>
  );
}
