import "@/styles/global.css";
import Layout from "@/components/Layout";
import { CartProvider } from "@/components/CartContext";

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}
