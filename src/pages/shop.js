import Head from 'next/head';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { useState } from 'react';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    'all',
    'skincare',
    'makeup',
    'haircare',
    'bodycare',
    'fragrance'
  ];
  
  const products = [
    {
      id: 1,
      name: 'Hydrating Face Cream',
      description: 'Deeply moisturizes and nourishes your skin',
      price: 25.99,
      image: '/images/face-cream.jpg',
      category: 'skincare'
    },
    {
      id: 2,
      name: 'Vitamin C Serum',
      description: 'Brightens and evens out skin tone',
      price: 34.99,
      image: '/images/serum.jpg',
      category: 'skincare'
    },
    {
      id: 3,
      name: 'Matte Lipstick',
      description: 'Long-lasting color with a velvety finish',
      price: 18.99,
      image: '/images/lipstick.jpg',
      category: 'makeup'
    },
    {
      id: 4,
      name: 'Daily Moisturizer',
      description: 'Lightweight hydration for everyday use',
      price: 22.99,
      image: '/images/moisturizer.jpg',
      category: 'skincare'
    },
    {
      id: 5,
      name: 'Hydrating Shampoo',
      description: 'Nourishes and repairs damaged hair',
      price: 19.99,
      image: '/images/shampoo.jpg',
      category: 'haircare'
    },
    {
      id: 6,
      name: 'Body Lotion',
      description: 'Silky smooth hydration for your body',
      price: 16.99,
      image: '/images/body-lotion.jpg',
      category: 'bodycare'
    },
    {
      id: 7,
      name: 'Floral Perfume',
      description: 'A delicate blend of spring flowers',
      price: 49.99,
      image: '/images/perfume.jpg',
      category: 'fragrance'
    },
    {
      id: 8,
      name: 'Face Mask',
      description: 'Detoxifies and rejuvenates your skin',
      price: 14.99,
      image: '/images/face-mask.jpg',
      category: 'skincare'
    }
  ];
  
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <Layout>
      <Head>
        <title>BeautyCare - Shop</title>
        <meta name="description" content="Shop our beauty and self-care products" />
      </Head>
      
      <div className="shop-header">
        <div className="container">
          <h1>Our Products</h1>
          <p>Discover our range of beauty and self-care products</p>
        </div>
      </div>
      
      <div className="shop-content">
        <div className="container">
          <div className="categories">
            {categories.map(category => (
              <button
                key={category}
                className={activeCategory === category ? 'active' : ''}
                onClick={() => setActiveCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .shop-header {
          background: var(--primary);
          padding: 100px 0 60px;
          text-align: center;
        }
        
        .shop-header h1 {
          color: var(--dark);
          margin-bottom: 10px;
        }
        
        .shop-content {
          padding: 60px 0;
        }
        
        .categories {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 40px;
        }
        
        .categories button {
          padding: 10px 20px;
          border: 2px solid var(--secondary);
          background: transparent;
          color: var(--secondary);
          border-radius: 30px;
          cursor: pointer;
          transition: var(--transition);
        }
        
        .categories button:hover,
        .categories button.active {
          background: var(--secondary);
          color: var(--white);
        }
        
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
        }
        
        @media (max-width: 576px) {
          .categories {
            gap: 10px;
          }
          
          .categories button {
            padding: 8px 15px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Shop;