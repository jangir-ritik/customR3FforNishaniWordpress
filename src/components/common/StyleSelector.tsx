import React from "react";
import useProductStore from "../../store/store";
import options from "../../../public/product_array.json";

const StyleSelector = () => {
  const { selectedPart, parts, productType } = useProductStore();
  const selectedModel = parts[selectedPart]?.selectedModel;
  let category;

  // Determine the category based on part type
  if (selectedPart === "topLock" || selectedPart === "bottomLock") {
    category = "hooks";
  } else {
    category = productType === "necklace" ? "necklaces" : "bracelets";
  }

  // Add safety checks before accessing nested properties
  const getStyleData = () => {
    if (!options.categories?.[category]) {
      console.error(`Category ${category} not found`);
      return null;
    }

    if (selectedModel === null) {
      return null;
    }

    const items = options.categories[category];
    if (!items?.[selectedModel]) {
      console.error(`Item at index ${selectedModel} not found in category ${category}`);
      return null;
    }

    return items[selectedModel];
  };

  const styleData = getStyleData();

  return (
    <div className="tdt-style-selector">
      {styleData && (
        // Render your style selector UI here
        <div>
<p className="tdt-style-label">
        Style: <span className="tdt-style-value">{styleData.name}</span>
      </p>
          <p className="tdt-style-label">
            Price: <span className="tdt-style-value">₹{styleData.price}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default StyleSelector;