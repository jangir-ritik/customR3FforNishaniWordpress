import React from "react";
import useProductStore from "../../store/store";

const AddToCartButton = () => {

      const handleAddToCart = async () => {
          try {
              // Order data logic here...
          } catch (error) {
              console.error("Error creating order:", error);
          }
      };

      return (
          <button className="add-to-cart" onClick={handleAddToCart}>
              Add to Cart
          </button>
      );
};

export default AddToCartButton;

