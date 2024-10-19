import React, { useState } from "react";

const DetailsAccordion = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
          <div className="custom-details-accordion-wrapper">
              <button onClick={() => setIsOpen(!isOpen)} className="custom-details-accordion-button">
                  Details
                  {/* {isOpen ? <MinusIcon /> : <AddIcon />} */}
                  +
              </button>
              {isOpen && <div className="accordion-content">Product details here...</div>}
          </div>
      );
};

export default DetailsAccordion;

