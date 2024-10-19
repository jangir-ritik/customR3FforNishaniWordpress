import React from "react";
import useProductStore from "../../store/store";

const PriceDisplay = () => {
      const calculateTotalPrice = useProductStore(state => state.calculateTotalPrice);
      const totalPrice = calculateTotalPrice();

      return (
          <div className="custom-price-display-container">
              <p className="custom-price-display-price">₹{totalPrice.toFixed(2)}</p>
              <p className="custom-price-display-tax-inclusive">(Inclusive of all taxes)</p>
          </div>
      );
};

export default PriceDisplay;

