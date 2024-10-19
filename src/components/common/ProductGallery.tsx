import React from "react";
import Image from "next/image";
import productImage1 from "@/public/pngs/product-view-1.png";
import productImage2 from "@/public/pngs/product-view-2.png";

const ProductGallery: React.FC = () => (
    <div className="product-gallery-container">
        {/* {images.map((src, index) => (
                <img key={index} src={src} alt={`Product view ${index + 1}`} />
            ))} */}
        <Image src={productImage1} alt={`Product view 1`} className="product-gallery-image" />
        <Image src={productImage2} alt={`Product view 2`} className="product-gallery-image" />
    </div>
);

export default ProductGallery;