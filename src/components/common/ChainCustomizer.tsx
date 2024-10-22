import React from "react";
import useProductStore from "../../store/store";
import ProductVariantLabel from "./ProductVariantLabel";
import productData from "../../../public/product_array.json";

const ChainCustomizer = () => {
  const { selectedPart, parts, setPartModel, productType } = useProductStore();
  const selectedModel = parts[selectedPart].selectedModel;
  const modelCount = parts[selectedPart].modelCount;

  const handleModelChange = (index) => {
    setPartModel(selectedPart, index);
  };

  const getImageSrc = (partType: ChainPart, index: number) => {
    let category;
    if (partType === "topLock" || partType === "bottomLock") {
      category = "hooks";
    } else {
      category = productType === "necklace" ? "necklaces" : "bracelets";
    }

    const items = productData.categories[category];
    if (items && items[index]) {
      return items[index].images[0].url; // Assuming we're using the first image (gold plating)
    }

    return "";
  };

  return (
    <div className="tdt-chain-customizer">
      <ProductVariantLabel />
      <div className="tdt-model-selector">
        {Array.from({ length: modelCount }).map((_, index) => (
          <div
            onClick={() => handleModelChange(index)}
            className={`tdt-model-option ${index === selectedModel ? 'tdt-selected' : ''}`}
            key={index}
          >
            <img 
              src={getImageSrc(selectedPart, index)} 
              alt={`${selectedPart} model ${index + 1}`} 
              onError={(e) => console.error('Image failed to load:', e.target.src)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChainCustomizer;
