import React from "react";
import Image from "next/image";
import useProductStore from "@/app/store/store";
import productImage from "@/public/pngs/view-container.png";

const ProductImage: React.FC = () => {

    const getContentToDisplay = () => {
        return {
            type: 'image',
            src: productImage,
            alt: "Default Product Image"
        };
    };

    const content = getContentToDisplay();

    return (
        <div className="product-image-container">
            {content.type === 'image' ? (
                <Image
                    src={content.src ?? ''}
                    alt={content.alt ?? ''}
                    className="product-main-image"
                />
            ) : (
                <div className="product-text-content">
                    test
                </div>
            )}
        </div>
    );
};

export default ProductImage;