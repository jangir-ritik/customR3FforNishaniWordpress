import React from "react";
import useProductStore from "../../store/store";

const StyleSelector = () => {
  const { selectedPart, parts } = useProductStore();
  const selectedModel = parts[selectedPart].selectedModel;
  const partLabel = parts[selectedPart].label;

  return (
    <div className="tdt-style-selector">
      <p className="tdt-style-label">
        Style for {partLabel}: <span className="tdt-style-value">Model {selectedModel + 1}</span>
      </p>
    </div>
  );
};

export default StyleSelector;