import Head from 'next/head';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <Layout>
      <Head>
        <title>BeautyCare - About Us</title>
        <meta name="description" content="Learn about BeautyCare" />
      </Head>

      {/* Hero Section */}
      <section className="hero">
        <motion.div 
          className="container fade-in"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>About Us</h1>
          <p>Your trusted partner in beauty & self-care ✨</p>
        </motion.div>
      </section>

      {/* About Content */}
      <section className="container" style={{ padding: "80px 20px" }}>
        <motion.div
          className="fade-in"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Who We Are</h2>
          <p>
            Welcome to <strong>SUBHAN SUNNY BEAUTYCARE</strong>, your number one source for all
            beauty products. We're dedicated to providing you the very best of beauty care, with
            an emphasis on <span className="highlight">quality</span>, 
            <span className="highlight"> customer service</span>, and 
            <span className="highlight"> uniqueness</span>.
          </p>
        </motion.div>

        <motion.div
          className="fade-in"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ marginTop: "60px" }}
        >
          <h2 className="section-title">Our Journey</h2>
          <p>
            Founded in 2023, SUBHAN SUNNY BEAUTYCARE has come a long way from its beginnings. 
            Our passion for providing the best beauty products drove us to start our own business
            — and today we are proud to be a trusted beauty brand.
          </p>
        </motion.div>

        <motion.div
          className="fade-in"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ marginTop: "60px" }}
        >
          <h2 className="section-title">Our Promise</h2>
          <p>
            We hope you enjoy our products as much as we enjoy offering them to you. If you have
            any questions or comments, please don't hesitate to contact us. 
            <br /><br />
            <strong>Sincerely,</strong><br />
            The SUBHAN SUNNY BEAUTYCARE Team 🌸
          </p>
        </motion.div>
      </section>

      {/* Page Specific Styles */}
      <style jsx>{`
        .hero {
          background: linear-gradient(rgba(255, 182, 193, 0.85), rgba(255, 182, 193, 0.85)), 
                      url('/images/about-hero.jpg');
          background-size: cover;
          background-position: center;
          min-height: 40vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px 20px;
          color: var(--dark);
        }

        .highlight {
          color: var(--secondary);
          font-weight: bold;
        }

        section p {
          line-height: 1.8;
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
        }

        .section-title {
          color: var(--primary);
          margin-bottom: 1.5rem;
          font-size: 2.2rem;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .fade-in {
          opacity: 0;
        }

        @media (max-width: 768px) {
          .hero {
            min-height: 35vh;
            padding: 30px 15px;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </Layout>
  );
};

export default About;
