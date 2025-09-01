import '@/../styles/global.css';
import Layout from '@/components/Layout';
import { CartProvider } from "@/components/CartContext";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <CartProvider>
      <Component {...pageProps} />
      </CartProvider>
    </Layout>
  );
}
