import React from "react";
import useProductStore from "../../store/store";

const MetalSelector = () => {
  const { selectedPart, parts, setPartPlating } = useProductStore();
  const selectedMetal = parts[selectedPart].plating;
  // const partLabel = parts[selectedPart].label;

  const handleMetalChange = (metal) => {
    setPartPlating(selectedPart, metal);
  };

  return (
    <div className="tdt-metal-selector">
      <p className="tdt-metal-label">Plating: </p>
      <div className="tdt-metal-options">
        <button
          type="button"
          onClick={() => handleMetalChange('gold')}
          className={`tdt-metal-button tdt-gold ${selectedMetal === 'gold' ? 'tdt-selected' : ''}`}
        />
        <button
          type="button"
          onClick={() => handleMetalChange('silver')}
          className={`tdt-metal-button tdt-silver ${selectedMetal === 'silver' ? 'tdt-selected' : ''}`}
        />
      </div>
    </div>
  );
};

export default MetalSelector;