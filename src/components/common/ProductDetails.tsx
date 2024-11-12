import React from "react";
import useProductStore from "../../store/store";

const ProductDetails = () => {
  const productData = useProductStore(state => state.productData);

  if (!productData?.description) {
    return <p className="tdt-product-description-error">Product details not available.</p>;
  }

  // Extract only the details section and replace \r\n with <br> tags
  const detailsSection = productData.description
    .split(/\r\n\r\n/)
    .slice(1)
    .join('\r\n\r\n')
    .replace(/\r\n/g, '<br />');

  return (
    <div className="tdt-details-accordion">
      Details
      <div className="tdt-accordion-content">
        <div 
          className="tdt-product-details"
          dangerouslySetInnerHTML={{ __html: detailsSection }}
        />
      </div>
    </div>
  );
};

export default ProductDetails;