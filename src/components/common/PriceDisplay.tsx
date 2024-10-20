import React from "react";
import useProductStore from "../../store/store";

const PriceDisplay = () => {
  const calculateTotalPrice = useProductStore(state => state.calculateTotalPrice);
  const parts = useProductStore(state => state.parts);

  // Use parts in the dependency array to trigger re-render
  const totalPrice = React.useMemo(() => calculateTotalPrice(), [parts, calculateTotalPrice]);

  return (
    <div className="tdt-price-display">
      <p className="tdt-price">₹{totalPrice.toFixed(2)}</p>
      <p className="tdt-tax-info">(Inclusive of all taxes)</p>
    </div>
  );
};

export default PriceDisplay;