import React, { memo } from "react";

const ProductImages = memo(({ gallery_images }: { gallery_images: { url: string, alt: string }[] }) => (
  console.log(gallery_images),
    <div className="tdt-product-images-wrapper">
      {gallery_images.map((image, index) => (
        <img 
        src={image.url} 
        alt={image.alt} 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        loading="lazy"
      />
      ))}
    </div>
  ));

export default ProductImages;

// "gallery_images": [
//   {
//     "id": "4731",
//     "url": "https://nishanistudio.com/wp-content/uploads/428-17.png",
//     "alt": "",
//     "caption": ""
//   },
//   {
//     "id": 4732,
//     "url": "https://nishanistudio.com/wp-content/uploads/428136.png",
//     "alt": "",
//     "caption": ""
//   }
// ],