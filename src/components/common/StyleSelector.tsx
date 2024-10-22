import React from "react";
import useProductStore from "../../store/store";
import options from "../../../public/product_array.json";

const StyleSelector = () => {
  const { selectedPart, parts } = useProductStore();
  const selectedModel = parts[selectedPart].selectedModel;
  const partLabel = parts[selectedPart].label;
  const category = selectedPart === 'topLock' || selectedPart === 'bottomLock' ? 'hooks' : 'necklaces';
  const title = options.categories[category][selectedModel].name;

  return (
    <div className="tdt-style-selector">
      <p className="tdt-style-label">
        Style for {selectedPart}: <span className="tdt-style-value">{title}</span>
      </p>
    </div>
  );
};

export default StyleSelector;