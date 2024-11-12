import React, { useState, useRef, useEffect } from "react";
import useProductStore from "../../store/store";

interface ProductDetail {
  text: string;
}

const ProductDescription = () => {
  const MAX_CHARS = 150; // You can adjust this number
  const productData = useProductStore(state => state.productData);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEllipsis, setShowEllipsis] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const parseDescription = (description: string): {
    mainDescription: string;
    details: ProductDetail[];
    note: string;
  } => {
    // Split by double newline to separate main description from details
    const parts = description.split(/\r\n\r\n/);
    const mainDescription = parts[0].trim();
    let details: ProductDetail[] = [];
    let note = '';

    // Handle both list formats
    if (description.includes('<ul>')) {
      // Original format with <ul> and <li>
      const listPart = description.split('<ul>')[1]?.split('</ul>')[0];
      const listItems = listPart?.match(/<li>(.*?)<\/li>/g) || [];
      details = listItems.map(item => ({
        text: item.replace(/<\/?li>/g, '').trim()
      }));
    } else if (description.includes('<strong>')) {
      // New format with <strong> tags
      const matches = description.matchAll(/<strong>([^<]+)<\/strong>\s*:\s*([^<\r\n]+)/g);
      details = Array.from(matches).map(match => ({
        text: `${match[1].trim()} - ${match[2].trim()}`
      }));
    }

    // Extract note (works for both formats)
    const notePart = description.match(/<p.*?>(.*?)<\/p>/);
    if (notePart) {
      note = notePart[1].trim();
    }

    return { mainDescription, details, note };
  };

  useEffect(() => {
    if (contentRef.current) {
      setShowEllipsis(contentRef.current.scrollHeight > contentRef.current.clientHeight);
    }
  }, [productData]);

  if (!productData?.description) {
    return (
      <p className="product-description__empty">
        Product description not available.
      </p>
    );
  }

  const { mainDescription } = parseDescription(productData.description);

  const displayText = isExpanded 
    ? mainDescription 
    : mainDescription.slice(0, MAX_CHARS).trim();

  return (
    <div className="tdt-product-description">
      <div
        className="product-description__container"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div
          ref={contentRef}
          className={`product-description__content ${isExpanded ? 'expanded' : ''}`}
        >
          <div className="product-description__text">
            {displayText}
            {!isExpanded && mainDescription.length > MAX_CHARS && <span>...</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;