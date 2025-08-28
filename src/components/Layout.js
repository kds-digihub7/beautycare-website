// components/Layout.js - Enhanced with consistent structure
import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <div className="layout">
      <Navbar />
      {loading && (
        <div className="page-loader">
          <div className="loading-spinner"></div>
        </div>
      )}
      <main className={loading ? 'opacity-50' : ''}>
        {children}
      </main>
      <Footer />
      
      <style jsx>{`
        .layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        main {
          flex: 1;
          transition: opacity 0.3s ease;
        }
        
        .page-loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
      `}</style>
    </div>
  );
}