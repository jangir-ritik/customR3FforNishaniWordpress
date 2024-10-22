import React from "react";
import useProductStore from "../../store/store";

const AddToCartButton = () => {
  const productData = useProductStore(state => state.productData);
  const calculateTotalPrice = useProductStore(state => state.calculateTotalPrice);
  const parts = useProductStore(state => state.parts);

  const handleAddToCart = async () => {
    try {
      const customPrice = calculateTotalPrice();
      
      const formData = new FormData();
      formData.append('action', 'pc_add_to_cart');
      formData.append('product_id', productData.id);
      formData.append('quantity', '1');
      formData.append('custom_price', customPrice.toString());

      // Add selected parts information
      Object.entries(parts).forEach(([partKey, part]) => {
        formData.append(`custom_${partKey}`, `Model-${part.selectedModel + 1}`);
      });
      
      // Use the WordPress ajaxurl variable
      const ajaxurl = window.ajaxurl || '/wp-admin/admin-ajax.php';
      
      const response = await fetch(ajaxurl, {
        method: 'POST',
        body: formData,
        credentials: 'same-origin'
      });

      const responseData = await response.json();
      if (response.ok && responseData.success) {
        console.log("Product added to cart successfully", responseData);
        
        // Trigger cart update
        document.body.dispatchEvent(new Event('wc_fragment_refresh'));
        
        // Optionally, you can also trigger the update_checkout event if you're on the checkout page
        document.body.dispatchEvent(new Event('update_checkout'));
      } else {
        console.error("Failed to add product to cart", responseData);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <button onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
