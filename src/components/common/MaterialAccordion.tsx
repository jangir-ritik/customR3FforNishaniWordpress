import React, { useState } from "react";
import AddIcon from "../../../../public/icons/add.svg";
import MinusIcon from "../../../../public/icons/minus.svg";

const MaterialAccordion: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="material-accordion-wrapper">
            <button onClick={() => setIsOpen(!isOpen)} className="material-accordion-button">
                Material
                {isOpen ? <MinusIcon /> : <AddIcon />}
            </button>
            {isOpen && <div className="accordion-content">Material information here...</div>}
        </div>
    );
};

export default MaterialAccordion;