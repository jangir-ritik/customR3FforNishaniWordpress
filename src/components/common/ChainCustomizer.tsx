import React from "react";
import useProductStore from "../../store/store";
import ProductVariantLabel from "./ProductVariantLabel";
import options from "../../../public/product_array.json";

const ChainCustomizer = () => {
  const { selectedPart, parts, setPartModel, productType } = useProductStore();
  const selectedModel = parts[selectedPart].selectedModel;
  const modelCount = parts[selectedPart].modelCount;
  let category;

  const handleModelChange = (index) => {
    setPartModel(selectedPart, index);
  };
  
  const getImageSrc = (partType, index: number) => {
    if (partType === "topLock" || partType === "bottomLock") {
      category = "hooks";
    } else {
      category = productType === "necklace" ? "necklaces" : "bracelets";
    }

    const items = options.categories[category];
    if (items && items[index]) {
      const selectedMetal = parts[selectedPart].plating;
      // if selectedMetal is gold, use the first image, if silver, use the second image
      return items[index].images[selectedMetal === 'gold' ? 0 : 1].url;
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
              title={`${options.categories[category][index].name}`}
              onError={(e) => console.error('Image failed to load:', e.target.src)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChainCustomizer;
