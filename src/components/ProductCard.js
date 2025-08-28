// components/ProductCard.js - New component for consistent product display
const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <div className="image-placeholder">
          <i className="fas fa-spa"></i>
        </div>
        <div className="product-overlay">
          <button className="quick-view-btn">Quick View</button>
        </div>
      </div>
      <div className="product-content">
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${product.price}</span>
          <button className="add-to-cart-btn">
            <i className="fas fa-shopping-cart"></i> Add to Cart
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .product-card {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
          transition: var(--transition);
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        
        .product-image {
          height: 200px;
          background: linear-gradient(135deg, #fce7f3, #fbcfe8);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        
        .image-placeholder {
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--secondary);
          font-size: 2rem;
        }
        
        .product-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(236, 72, 153, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: var(--transition);
        }
        
        .product-card:hover .product-overlay {
          opacity: 1;
        }
        
        .quick-view-btn {
          background: white;
          color: var(--secondary);
          border: none;
          padding: 10px 20px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }
        
        .quick-view-btn:hover {
          transform: scale(1.05);
        }
        
        .product-content {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .product-card h3 {
          font-size: 18px;
          color: var(--secondary-dark);
          margin-bottom: 10px;
        }
        
        .product-description {
          color: var(--dark);
          margin-bottom: 15px;
          font-size: 14px;
          line-height: 1.5;
          flex: 1;
        }
        
        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .product-price {
          font-size: 18px;
          font-weight: 700;
          color: var(--secondary-dark);
        }
        
        .add-to-cart-btn {
          background: var(--secondary);
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 20px;
          cursor: pointer;
          font-weight: 500;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: var(--transition);
        }
        
        .add-to-cart-btn:hover {
          background: var(--secondary-dark);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default ProductCard;