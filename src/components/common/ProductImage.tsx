import React, { memo } from "react";

const ProductImage = memo(({ imageUrl }: { imageUrl: string }) => (
    <div className="tdt-product-image-wrapper">
      <img 
        src={imageUrl} 
        alt="product" 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        loading="lazy"
      />
    </div>
  ));

export default ProductImage;