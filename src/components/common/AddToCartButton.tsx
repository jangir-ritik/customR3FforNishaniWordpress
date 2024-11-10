import React, { useState } from 'react';
import useProductStore from "../../store/store";
import { ChainPart } from '../../types/type';
import options from '../../../public/product_array.json';

const AddToCartButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const productData = useProductStore(state => state.productData);
  const calculateTotalPrice = useProductStore(state => state.calculateTotalPrice);
  const parts = useProductStore(state => state.parts);
  const productType = useProductStore(state => state.productType);

  const { pc_ajax } = window;

  const getModelName = (partType: ChainPart, modelIndex: number): string => {
    const category = partType === 'topLock' || partType === 'bottomLock' 
      ? 'hooks' 
      : productType === 'necklace' ? 'necklaces' : 'bracelets';
    
    return options.categories[category]?.[modelIndex]?.name || 'Unknown Model';
  };

  const handleSnapshot = async (): Promise<string | null> => {
    try {
      const canvas = document.querySelector('canvas');
      if (!canvas) {
        throw new Error('Canvas element not found');
      }
      
      // Get higher quality image
      const url = canvas.toDataURL('image/jpeg', 0.9);
      return url;
    } catch (error) {
      console.error('Error taking snapshot:', error);
      return null;
    }
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const productImage = await handleSnapshot();
      if (!productImage) {
        throw new Error('Failed to capture product image');
      }

      // Validate required data
      if (!pc_ajax?.ajax_url || !pc_ajax?.nonce) {
        throw new Error('Required configuration is missing');
      }

      if (!productData?.id) {
        throw new Error('Product ID is missing');
      }

      const customPrice = calculateTotalPrice();
      const itemCodes = useProductStore.getState().getSelectedItemCodes();

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

      if (Object.keys(formattedParts).length === 0) {
        throw new Error('Please select all required parts');
      }

      const formData = new FormData();
      formData.append('action', 'pc_add_to_cart');
      formData.append('security', pc_ajax.nonce);
      formData.append('product_id', productData.id);
      formData.append('quantity', '1');
      formData.append('custom_price', customPrice.toString());
      formData.append('parts', JSON.stringify(formattedParts));
      formData.append('product_image', productImage); // Add the image data

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
        throw new Error(responseData.data?.message || 'Failed to add product to cart');
      }

      document.body.dispatchEvent(new Event('wc_fragment_refresh'));
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