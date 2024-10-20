import React from "react";
import useProductStore from "../../store/store";
import ProductVariantLabel from "./ProductVariantLabel";

const ChainCustomizer = () => {
  const { selectedPart, parts, setPartModel } = useProductStore();
  const selectedModel = parts[selectedPart].selectedModel;
  const modelCount = parts[selectedPart].modelCount;
  const productData = useProductStore(state => state.productData);

  console.log(productData?.attributes)

  const handleModelChange = (index) => {
    setPartModel(selectedPart, index);
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
            model {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChainCustomizer;