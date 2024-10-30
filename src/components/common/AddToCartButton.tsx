import React, { useState } from 'react';
import useProductStore from "../../store/store";
import { ChainPart } from '../../types/type';
import options from '../../../public/product_array.json';

const AddToCartButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const productData = useProductStore(state => state.productData);
  const calculateTotalPrice = useProductStore(state => state.calculateTotalPrice);
  const getSelectedItemCodes = useProductStore(state => state.getSelectedItemCodes);
  const parts = useProductStore(state => state.parts);
  const productType = useProductStore(state => state.productType);

  // Access WordPress localized variables
  const { pc_ajax } = window;

  const getModelName = (partType: ChainPart, modelIndex: number): string => {
    const category = partType === 'topLock' || partType === 'bottomLock' 
      ? 'hooks' 
      : productType === 'necklace' ? 'necklaces' : 'bracelets';
    
    return options.categories[category]?.[modelIndex]?.name || 'Unknown Model';
  };

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
      const itemCodes = useProductStore.getState().getSelectedItemCodes();

      // Format the parts data
      const formattedParts = {};
      Object.entries(parts).forEach(([partKey, part]) => {
        if (part.selectedModel !== undefined && part.plating && part.prices) {
          const modelName = getModelName(partKey as ChainPart, part.selectedModel)
          formattedParts[partKey] = {
            model: `Model-${part.selectedModel + 1}`,
            modelName: modelName,
            plating: part.plating,
            price: part.prices[part.selectedModel],
            itemCode: itemCodes[partKey as ChainPart]
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