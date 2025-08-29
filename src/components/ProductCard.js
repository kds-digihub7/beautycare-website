export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <div className="product-overlay">
          <button className="quick-view-btn">Quick View</button>
        </div>
      </div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="product-footer">
        <span className="price">${product.price}</span>
        <button className="add-to-cart">Add to Cart</button>
      </div>

      <style jsx>{`
        .product-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }
        .product-card:hover { transform: translateY(-5px); }
        .product-image { position: relative; }
        .product-image img {
          width: 100%; height: 200px; object-fit: cover;
          border-radius: 10px;
        }
        .product-overlay {
          position: absolute; top:0; left:0; right:0; bottom:0;
          display:flex; align-items:center; justify-content:center;
          background:rgba(236,72,153,0.7); opacity:0;
          transition: opacity 0.3s ease;
        }
        .product-card:hover .product-overlay { opacity: 1; }
        .quick-view-btn {
          background:white; color:#ec4899;
          padding:8px 16px; border-radius:20px;
          font-weight:600; cursor:pointer;
        }
        h3 { margin-top: 12px; font-size: 18px; color:#7c2d69; }
        .price { font-weight: bold; color:#ec4899; }
        .add-to-cart {
          background:#ec4899; color:white;
          border:none; padding:6px 14px;
          border-radius:20px; cursor:pointer;
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
