//src/pages/blogs.js
import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";

const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Healthy Skin",
    excerpt:
      "Discover simple and effective tips to keep your skin glowing and healthy...",
    date: "August 25, 2025",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Top 5 Natural Beauty Remedies",
    excerpt:
      "Nature provides some of the best remedies for glowing and youthful skin...",
    date: "August 27, 2025",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "Skincare Routine for Beginners",
    excerpt:
      "Starting your skincare journey? Here's a simple guide to help you...",
    date: "August 29, 2025",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
];

export default function Blog() {
  return (
    <>
      <Head>
        <title>KO Beauty - Blog</title>
        <meta
          name="description"
          content="Read our latest beauty tips and skincare advice"
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-pink-500 to-purple-600 text-white py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold"
          >
            Our Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-4 text-lg"
          >
            Insights, skincare tips, and beauty secrets just for you ✨
          </motion.p>
        </div>

        {/* Blog Grid */}
        <div className="container mx-auto px-6 py-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {blogPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-56 object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
                  }}
                />
                <div className="p-6">
                  <p className="text-sm text-gray-500">{post.date}</p>
                  <h2 className="text-xl font-semibold mt-2">{post.title}</h2>
                  <p className="text-gray-600 mt-3">{post.excerpt}</p>
                  <Link href={`/blog/${post.id}`} passHref>
                    <span className="inline-block mt-4 text-pink-600 font-semibold hover:underline cursor-pointer">
                      Read More →
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
      `}</style>
    </>
  );
}
