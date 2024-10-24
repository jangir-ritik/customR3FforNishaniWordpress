import React, { useState } from 'react';
import useProductStore from "../../store/store";

const AddToCartButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const productData = useProductStore(state => state.productData);
  const calculateTotalPrice = useProductStore(state => state.calculateTotalPrice);
  const parts = useProductStore(state => state.parts);

  // Access WordPress localized variables
  const { pc_ajax } = window;

  const handleAddToCart = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate required data
      if (!pc_ajax?.ajax_url || !pc_ajax?.nonce) {
        throw new Error('Required configuration is missing');
      }

      if (!productData?.id) {
        throw new Error('Product ID is missing');
      }

      // Get the custom price
      const customPrice = calculateTotalPrice();

      // Format the parts data
      const formattedParts = {};
      Object.entries(parts).forEach(([partKey, part]) => {
        if (part.selectedModel !== undefined && part.plating && part.prices) {
          formattedParts[partKey] = {
            model: `Model-${part.selectedModel + 1}`,
            plating: part.plating,
            price: part.prices[part.selectedModel]
          };
        }
      });

      // Validate parts data
      if (Object.keys(formattedParts).length === 0) {
        throw new Error('Please select all required parts');
      }

      // Create the FormData object
      const formData = new FormData();

      // Add all required fields
      formData.append('action', 'pc_add_to_cart');
      formData.append('security', pc_ajax.nonce);
      formData.append('product_id', productData.id);
      formData.append('quantity', '1');
      formData.append('custom_price', customPrice.toString());
      formData.append('parts', JSON.stringify(formattedParts));

      // Make the AJAX request
      const response = await fetch(pc_ajax.ajax_url, {
        method: 'POST',
        credentials: 'same-origin',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      if (!responseData.success) {
        console.error(responseData.data?.message);
        throw new Error(responseData.data?.message || 'Failed to add product to cart');
      }

      // Success handling
      document.body.dispatchEvent(new Event('wc_fragment_refresh'));
      console.log(responseData.message);
      // Optional: Update mini cart if you're using WooCommerce fragments
      if (typeof jQuery !== 'undefined') {
        jQuery(document.body).trigger('wc_fragment_refresh');
        jQuery(document.body).trigger('added_to_cart');
      }

      // Show success message
      alert('Product added to cart successfully!');

    } catch (error) {
      console.error('Error adding to cart:', error);
      setError(error.message || 'Failed to add product to cart');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-to-cart-container">
      <button
        onClick={handleAddToCart}
        disabled={isLoading}
        className={`add-to-cart-button ${isLoading ? 'loading' : ''}`}
      >
        {isLoading ? 'Adding to Cart...' : 'Add to Cart'}
      </button>
      {error && (
        <div className="error-message mt-2 text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;