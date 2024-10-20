import React from "react";
import useProductStore from "../../store/store";

const MetalSelector = () => {
  const { selectedPart, parts, setPartMetal } = useProductStore();
  const selectedMetal = parts[selectedPart].metal;
  const partLabel = parts[selectedPart].label;

  const handleMetalChange = (metal) => {
    setPartMetal(selectedPart, metal);
  };

  return (
    <div className="tdt-metal-selector">
      <p className="tdt-metal-label">Plating for {partLabel}:</p>
      <div className="tdt-metal-options">
        <button
          type="button"
          onClick={() => handleMetalChange('gold')}
          className={`tdt-metal-button tdt-gold ${selectedMetal === 'gold' ? 'tdt-selected' : ''}`}
        >
          {/* Gold */}
        </button>
        <button
          type="button"
          onClick={() => handleMetalChange('silver')}
          className={`tdt-metal-button tdt-silver ${selectedMetal === 'silver' ? 'tdt-selected' : ''}`}
        >
          {/* Silver */}
        </button>
      </div>
    </div>
  );
};

export default MetalSelector;