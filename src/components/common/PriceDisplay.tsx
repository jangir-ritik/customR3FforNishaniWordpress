import React from "react";
import useProductStore from "../../store/store";

const PriceDisplay = () => {
  const totalPrice = useProductStore(state => state.totalPrice);

  return (
    <div className="tdt-price-display">
      <p className="tdt-price">₹{totalPrice.toLocaleString('en-IN')}</p>
      <p className="tdt-tax-info">(Inclusive of all taxes)</p>
    </div>
  );
};

export default PriceDisplay;
