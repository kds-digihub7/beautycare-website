import Head from "next/head";
import Layout from "../components/Layout";
import { motion } from "framer-motion";

const About = () => {
  return (
    <> {/* Add prop to conditionally hide footer in Layout */}
      <Head>
        <title>BeautyCare - About Us</title>
        <meta name="description" content="Learn about BeautyCare" />
      </Head>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              About Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Your trusted partner in beauty & self-care ✨
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="about-content">
        {/* Who We Are */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="about-section"
        >
          <div className="section-content">
            <div className="text-content">
              <h2>Who We Are</h2>
              <p>
                Welcome to <strong>SUBHAN SUNNY BEAUTYCARE</strong>, your number one
                source for all beauty products. We're dedicated to providing you the
                very best of beauty care, with an emphasis on{" "}
                <span className="highlight">quality</span>,{" "}
                <span className="highlight">customer service</span>, and{" "}
                <span className="highlight">uniqueness</span>.
              </p>
            </div>
            <div className="image-content">
              <motion.div 
                className="image-placeholder"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                viewport={{ once: true }}
              >
                <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" alt="Luxury beauty products" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Our Journey */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="about-section reversed"
        >
          <div className="section-content">
            <div className="text-content">
              <h2>Our Journey</h2>
              <p>
                Founded in 2023, SUBHAN SUNNY BEAUTYCARE has come a long way from
                its beginnings. Our passion for providing the best beauty products
                drove us to start our own business — and today we are proud to be a
                trusted beauty brand.
              </p>
            </div>
            <div className="image-content">
              <motion.div 
                className="image-placeholder"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                viewport={{ once: true }}
              >
                <img src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Beauty journey" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Our Promise */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="about-section promise-section"
        >
          <div className="promise-content">
            <h2>Our Promise</h2>
            <p>
              We hope you enjoy our products as much as we enjoy offering them to
              you. If you have any questions or comments, please don't hesitate to
              contact us.
            </p>
            <div className="signature">
              <strong>Sincerely,</strong>
              <br />
              The SUBHAN SUNNY BEAUTYCARE Team 🌸
            </div>
          </div>
        </motion.div>
      </section>

      <style jsx>{`
        .hero-section {
          position: relative;
          overflow: hidden;
        }
        .hero-background {
          background: linear-gradient(135deg, rgba(124, 45, 105, 0.85) 0%, rgba(189, 77, 117, 0.85) 100%), 
                     url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80');
          background-size: cover;
          background-position: center;
          padding: 120px 20px;
          text-align: center;
          color: white;
          position: relative;
        }
        .hero-content h1 {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        .hero-content p {
          font-size: 1.5rem;
          max-width: 600px;
          margin: 0 auto;
          font-weight: 300;
        }
        .about-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 20px;
        }
        .about-section {
          margin-bottom: 100px;
          position: relative;
        }
        .section-content {
          display: flex;
          align-items: center;
          gap: 60px;
        }
        .reversed .section-content {
          flex-direction: row-reverse;
        }
        .text-content {
          flex: 1;
        }
        .text-content h2 {
          font-size: 2.5rem;
          color: #7c2d69;
          margin-bottom: 1.5rem;
          position: relative;
          padding-bottom: 15px;
        }
        .text-content h2:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(to right, #ec4899, #7c2d69);
        }
        .text-content p {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #555;
        }
        .image-content {
          flex: 1;
          position: relative;
        }
        .image-placeholder {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        .image-placeholder:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }
        .image-placeholder img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          display: block;
        }
        .highlight {
          color: #ec4899;
          font-weight: 600;
          position: relative;
          display: inline-block;
        }
        .highlight:after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 6px;
          background: rgba(236, 72, 153, 0.2);
          z-index: -1;
        }
        .promise-section {
          background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
          border-radius: 20px;
          padding: 60px;
          margin-top: 40px;
          text-align: center;
        }
        .promise-content h2 {
          font-size: 2.5rem;
          color: #7c2d69;
          margin-bottom: 2rem;
        }
        .promise-content p {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #555;
          max-width: 800px;
          margin: 0 auto 2rem;
        }
        .signature {
          font-style: italic;
          font-size: 1.3rem;
          color: #7c2d69;
        }
        @media (max-width: 968px) {
          .section-content {
            flex-direction: column;
            gap: 40px;
          }
          .reversed .section-content {
            flex-direction: column;
          }
          .hero-content h1 {
            font-size: 2.5rem;
          }
          .hero-content p {
            font-size: 1.2rem;
          }
          .about-content {
            padding: 60px 20px;
          }
          .text-content h2 {
            font-size: 2rem;
          }
          .promise-section {
            padding: 40px 20px;
          }
        }
        @media (max-width: 768px) {
          .hero-background {
            padding: 80px 20px;
          }
          .hero-content h1 {
            font-size: 2rem;
          }
          .text-content h2 {
            font-size: 1.8rem;
          }
          .text-content p {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </>
  );
};

export default About;