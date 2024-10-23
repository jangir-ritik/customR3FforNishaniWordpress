import React from "react";
import useProductStore from "../../store/store";
import options from "../../../public/product_array.json";

const StyleSelector = () => {
  const { selectedPart, parts } = useProductStore();
  const selectedModel = parts[selectedPart].selectedModel;
  const category = selectedPart === 'topLock' || selectedPart === 'bottomLock' ? 'hooks' : 'necklaces';
  const title = options.categories[category][selectedModel].name;
  const price = options.categories[category][selectedModel].price;

  return (
    <div className="tdt-style-selector">
      <p className="tdt-style-label">
        Style: <span className="tdt-style-value">{title}</span>
      </p>
      <p className="tdt-style-label">
        Price: <span className="tdt-style-value">₹{price}</span>
      </p>
    </div>
  );
};

export default StyleSelector;