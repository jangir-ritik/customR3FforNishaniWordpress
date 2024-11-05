import React from "react";
import useProductStore from "../../store/store";
import ProductVariantLabel from "./ProductVariantLabel";
import options from "../../../public/product_array.json";
import { ChainPart } from "../../types/type";

const ChainCustomizer = () => {
  const { selectedPart, parts, setPartModel, productType } = useProductStore();
  const selectedModel = parts[selectedPart].selectedModel;
  const modelCount = parts[selectedPart].modelCount;
  let category;

  const handleModelChange = (index: number | null) => {
    setPartModel(selectedPart, index);
  };

  const getImageSrc = (partType: ChainPart, index: number) => {
    if (partType === "topLock" || partType === "bottomLock") {
      category = "hooks";
    } else {
      category = productType === "necklace" ? "necklaces" : "bracelets";
    }

    if (!options.categories[category]) {
      console.error(`Category ${category} not found`);
      return "";
    }

    const items = options.categories[category];
    if (!items || !items[index]) {
      console.error(`Item at index ${index} not found in category ${category}`);
      return "";
    }

    if (!items[index].images || items[index].images.length < 2) {
      console.error(`Images not properly configured for item at index ${index}`);
      return "";
    }

    const selectedMetal = parts[selectedPart].plating;
    return items[index].images[selectedMetal === 'gold' ? 0 : 1].url;
  };

  const getImageRotation = (partType: ChainPart) => {
    if (partType === 'rightChain') {
      return { transform: 'rotate(180deg)' }
    }
  }

  return (
    <div className="tdt-chain-customizer">
      <ProductVariantLabel />
      <div className="tdt-model-selector">
        {selectedPart === "additionalChain" && (
          <div
            onClick={() => handleModelChange(null)}
            className={`tdt-model-option ${selectedModel === null ? 'tdt-selected' : ''}`}
            key="no-chain"
          >
            <img
              src={"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNlOWU1ZTIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaXJjbGUtc2xhc2gtMiI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48cGF0aCBkPSJNMjIgMiAyIDIyIi8+PC9zdmc+"}
              alt="No additional chain"
              title="No additional chain"
            />
            <span className="no-chain-label"></span>
          </div>
        )}
        {Array.from({ length: modelCount }).map((_, index) => (
          <div
            onClick={() => handleModelChange(index)}
            className={`tdt-model-option ${index === selectedModel ? 'tdt-selected' : ''}`}
            key={index}
          >
            <img
              src={getImageSrc(selectedPart, index)}
              alt={`${selectedPart} model ${index + 1}`}
              style={getImageRotation(selectedPart)}
              title={options.categories[category]?.[index]?.name || `Model ${index + 1}`}
              onError={(e) => {
                console.error('Image failed to load:', e.currentTarget.src);
                e.currentTarget.src = 'fallback-image-url.jpg';
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChainCustomizer;
