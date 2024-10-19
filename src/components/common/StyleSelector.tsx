import React from "react";
import useProductStore from "../../store/store";

const StyleSelector = () => {
      const { selectedPart, parts } = useProductStore();
      const selectedModel = parts[selectedPart].selectedModel;
      const partLabel = parts[selectedPart].label;

      return (
          <div className="custom-style-selector-container">
              <p className="custom-style-selector-label">
                  Style for {partLabel}: <span className="custom-style-selector-value">Model {selectedModel +1}</span>
              </p>
          </div>
      );
};

export default StyleSelector;

