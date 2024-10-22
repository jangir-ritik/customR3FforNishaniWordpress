import React from "react";
import useProductStore from "../../store/store";

const PriceDisplay = () => {
  const calculateTotalPrice = useProductStore(state => state.calculateTotalPrice);
  const parts = useProductStore(state => state.parts);

  const totalPrice = React.useMemo(() => {
    const price = calculateTotalPrice();
    console.log('Calculated total price:', price);
    return isNaN(price) ? 0 : price;
  }, [parts, calculateTotalPrice]);

  return (
    <div className="tdt-price-display">
      <p className="tdt-price">₹{totalPrice.toLocaleString('en-IN')}</p>
      <p className="tdt-tax-info">(Inclusive of all taxes)</p>
    </div>
  );
};

export default PriceDisplay;
