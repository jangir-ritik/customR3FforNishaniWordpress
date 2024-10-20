import React from "react";
import useProductStore from "../../store/store";

interface ProductDetail {
  text: string;
}

const ProductDescription: React.FC = () => {
  const productData = useProductStore(state => state.productData);

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
    return <p className="tdt-product-description">Product description not available.</p>;
  }

  const { mainDescription } = parseDescription(productData.description);

  return (
    <div className="tdt-product-description">
      <p className="tdt-product-main-description">{mainDescription}</p>
    </div>
  );
};

export default ProductDescription;