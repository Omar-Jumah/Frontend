function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.title} className="product-image" />
      </div>

      <div className="product-content">
        <span className="product-badge">AI Ready</span>
        <h2 className="product-title">{product.title}</h2>
        <p className="product-description">{product.description}</p>

        <button className="primary-btn">Generate AI Content</button>
      </div>
    </div>
  );
}

export default ProductCard;