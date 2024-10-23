import React, { useState, useRef, useEffect } from "react";
import useProductStore from "../../store/store";

interface ProductDetail {
  text: string;
}

const ProductDescription = () => {
  const productData = useProductStore(state => state.productData);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const parseDescription = (description: string): { 
    mainDescription: string; 
    details: ProductDetail[]; 
    note: string 
  } => {
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

  useEffect(() => {
    if (contentRef.current) {
      setShowButton(contentRef.current.scrollHeight > contentRef.current.clientHeight);
    }
  }, [productData]);

  if (!productData?.description) {
    return (
      <p className="product-description__empty">
        Product description not available.
      </p>
    );
  }

  const { mainDescription, details, note } = parseDescription(productData.description);

  return (
    <div className="product-description">
      <div className="product-description__container">
        <div 
          ref={contentRef}
          className={`product-description__content ${isExpanded ? 'expanded' : ''}`}
        >
          <div className="product-description__text">
            {mainDescription}
          </div>
        </div>
        {!isExpanded && showButton && (
          <div className="product-description__gradient" />
        )}
      </div>
      {showButton && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="product-description__button"
        >
          <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
          <span className="product-description__icon">
            {isExpanded ? '\u25B2' : '\u25BC'}
          </span>
        </button>
      )}
    </div>
  );
};

export default ProductDescription;
