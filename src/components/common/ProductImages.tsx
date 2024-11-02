import React, { memo } from "react";

const ProductImages = memo(({ gallery_images }: { gallery_images: { url: string, alt: string }[] }) => (
  gallery_images && (
    <div className="tdt-product-images-wrapper">
      {gallery_images.map((image) => (
        <img 
        src={image.url} 
        alt={image.alt} 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        loading="lazy"
      />
      ))}
    </div>
  )
));

export default ProductImages;