import React from "react";
import useProductStore from "../../store/store";

const MetalSelector = () => {
      const { selectedPart, parts, setPartMetal } = useProductStore();
      const selectedMetal = parts[selectedPart].metal;
      const partLabel = parts[selectedPart].label;

      return (
          <div className="custom-metal-selector-container">
              <p className="custom-metal-selector-label">Metal for {partLabel}:</p>
              <div className="custom-metal-selector-buttons-wrapper">
                  <button
                      onClick={() => setPartMetal(selectedPart, 'gold')}
                      className={selectedMetal === 'gold' ? 'custom-selected' : ''}
                      style={{ backgroundColor:'gold', color:'black' }}
                  >
                      {/* Gold */}
                  </button>
                  <button
                      onClick={() => setPartMetal(selectedPart, 'silver')}
                      className={selectedMetal === 'silver' ? 'custom-selected' : ''}
                      style={{ backgroundColor:'silver', color:'black' }}
                  >
                      {/* Silver */}
                  </button>
              </div>
          </div>
      );
};

export default MetalSelector;

