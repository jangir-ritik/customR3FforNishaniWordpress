import React from "react";
import useProductStore from "../../store/store";
import ProductVariantLabel from "./ProductVariantLabel";

const ChainCustomizer = () => {
  const { selectedPart, parts, setPartModel } = useProductStore();
  const selectedModel = parts[selectedPart].selectedModel;
  const modelCount = parts[selectedPart].modelCount;

  const handleModelChange = (index) => {
    setPartModel(selectedPart, index);
  };

  // the images are in the images folder inside of public folder 

  // get models images for top lock (hook) ===> hook-model1.png, hook-model2.png, hook-model3.png, hook-model4.png, hook-model5.png
  // get model images for left chain ===> id productType === 'necklace' ? necklace-model1.png, necklace-model2.png, necklace-model3.png, necklace-model4.png, necklace-model5.png : bracelet-model1.png, bracelet-model2.png, bracelet-model3.png, bracelet-model4.png, bracelet-model5.png
  // get model images for right chain ===> id productType === 'necklace' ? necklace-model1.png, necklace-model2.png, necklace-model3.png, necklace-model4.png, necklace-model5.png : bracelet-model1.png, bracelet-model2.png, bracelet-model3.png, bracelet-model4.png, bracelet-model5.png
  // get model images for bottom lock (hook) ===> hook-model1.png, hook-model2.png, hook-model3.png, hook-model4.png, hook-model5.png
  // get model images for additional chain (if any) ===> id productType === 'necklace' ? necklace-model1.png, necklace-model2.png, necklace-model3.png, necklace-model4.png, necklace-model5.png : bracelet-model1.png, bracelet-model2.png, bracelet-model3.png, bracelet-model4.png, bracelet-model5.png

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
            {/* TODO: add the images */}
            {/* if productVariantLabel === left chain, then use the left chain model image */}
            {/* if productVariantLabel === right chain, then use the right chain model image */}
            {/* if productVariantLabel === top lock, then use the top lock model image */}
            {/* if productVariantLabel === bottom lock, then use the bottom lock model image */}
            {/* if productVariantLabel === additional chain, then use the additional chain model image */}
            {/* <img src={`/images/hooks/hook-model${index + 1}.png`} alt={`model ${index + 1}`} /> */}
            model {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChainCustomizer;
