// pages/_app.js - Updated with global styles and layout
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Handle route changes for page transitions
    const handleRouteChange = () => {
      document.documentElement.classList.add('page-transition');
      setTimeout(() => {
        document.documentElement.classList.remove('page-transition');
      }, 300);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;