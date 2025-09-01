import { useCart } from "./CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <div className="product-overlay">
          <button className="quick-view-btn">Quick View</button>
        </div>
      </div>
      <h3>{product.name}</h3>
      <p className="desc">{product.description}</p>
      <div className="product-footer">
        <span className="price">${product.price}</span>
        <button className="add-to-cart" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>

      <style jsx>{`
        .product-card {
          background: white;
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          transition: transform 0.2s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .product-card:hover { transform: translateY(-5px); }
        .product-image { position: relative; }
        .product-image img {
          width: 100%; height: 180px; object-fit: cover;
          border-radius: 10px;
        }
        .product-overlay {
          position: absolute; inset: 0;
          display:flex; align-items:center; justify-content:center;
          background:rgba(236,72,153,0.6); opacity:0;
          transition: opacity 0.3s ease;
          border-radius: 10px;
        }
        .product-card:hover .product-overlay { opacity: 1; }
        .quick-view-btn {
          background:white; color:#ec4899;
          padding:8px 14px; border-radius:20px;
          font-weight:600; cursor:pointer;
          border: none;
        }
        h3 { margin-top: 12px; font-size: 1rem; color:#7c2d69; }
        .desc {
          font-size: 0.85rem;
          color: #6b7280;
          margin: 8px 0;
          flex-grow: 1;
        }
        .price { font-weight: bold; color:#ec4899; font-size: 1rem; }
        .add-to-cart {
          background:#ec4899; color:white;
          border:none; padding:6px 14px;
          border-radius:20px; cursor:pointer;
          font-size: 0.9rem;
        }
        .add-to-cart:hover { background:#db2777; }
        .product-footer {
          margin-top:10px;
          display:flex; justify-content:space-between; align-items:center;
        }
      `}</style>
    </div>
  );
}
