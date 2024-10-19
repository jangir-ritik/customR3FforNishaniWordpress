import React from "react";
import useProductStore from "../../store/store";
import ProductVariantLabel from "./ProductVariantLabel";

const ChainCustomizer = () => {
      const { selectedPart, parts, setPartModel } = useProductStore();
      const selectedModel = parts[selectedPart].selectedModel;
      const modelCount = parts[selectedPart].modelCount;

      return (
          <div className="custom-chain-customizer-container">
              <ProductVariantLabel />
              <div style={{display:'flex', gap:'10'}}>
                  {Array.from({ length:modelCount }).map((_, index) => (
                      <div
                          onClick={() => setPartModel(selectedPart, index)}
                          className={index === selectedModel ? 'custom-selected custom-product-variant-type' : 'custom-product-variant-type'}
                          key={index}
                      >
                          model {index +1}
                      </div>
                  ))}
              </div>
          </div>
      );
};

export default ChainCustomizer;