import React from "react";
import useProductStore from "../../store/store";

const ProductHeader = () => {
  const productData = useProductStore(state => state.productData);

  return (
  <div className="tdt-product-header">
    <h1 className="tdt-product-title">{productData?.name || 'Custom Bracelet'}</h1>
    <div className="tdt-product-actions">
      <button className="tdt-action-button tdt-share-button">{/* ShareIcon */}</button>
      <button className="tdt-action-button tdt-favorite-button">{/* FavoriteIcon */}</button>
    </div>
  </div>
)};

export default ProductHeader;