// src/pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Example: Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#FF7AB6" />
        <meta
          name="description"
          content="BeautyCare - Modern beauty and self-care products website"
        />
      </Head>
      <body className="antialiased bg-pink-light text-gray-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
