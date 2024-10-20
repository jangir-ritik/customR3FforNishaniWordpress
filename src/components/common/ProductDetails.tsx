import React from "react";
import useProductStore from "../../store/store";

const ProductDetails = () => {
  const productData = useProductStore(state => state.productData);

  interface ProductDetail {
    text: string;
  }

  const parseDescription = (description: string): { mainDescription: string; details: ProductDetail[]; note: string } => {
    const parts = description.split('<ul>');
    const mainDescription = parts[0].trim();
    
    let details: ProductDetail[] = [];
    let note = '';

    if (parts[1]) {
      const detailsPart = parts[1].split('</ul>');
      const listItems = detailsPart[0].match(/<li>(.*?)<\/li>/g) || [];
      details = listItems.map(item => ({
        text: item.replace(/<\/?li>/g, '').trim()
      }));

      const notePart = detailsPart[1].match(/<p.*?>(.*?)<\/p>/);
      if (notePart) {
        note = notePart[1].trim();
      }
    }

    return { mainDescription, details, note };
  };

  if (!productData?.description) {
    return <p className="tdt-product-description-error">Product details not available.</p>;
  }

  const { details, note } = parseDescription(productData.description);

  return (
    <div className="tdt-details-accordion">
        Details
        <div className="tdt-accordion-content">
                {details.length > 0 && (
        <ul className="tdt-product-details">
          {details.map((detail, index) => (
            <li key={index}>{detail.text}</li>
          ))}
        </ul>
      )}
      {/* {note && <p className="tdt-product-note">{note}</p>} */}
        </div>
    </div>
  );
};

export default ProductDetails;