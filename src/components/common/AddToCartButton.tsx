import React, { useState } from 'react';
import useProductStore from "../../store/store";

const AddToCartButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const productData = useProductStore(state => state.productData);
    const calculateTotalPrice = useProductStore(state => state.calculateTotalPrice);
    const parts = useProductStore(state => state.parts);

    const handleAddToCart = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Get the custom price
            const customPrice = calculateTotalPrice();

            // Format the parts data
            const formattedParts = {};
            Object.entries(parts).forEach(([partKey, part]) => {
                formattedParts[partKey] = {
                    model: `Model-${part.selectedModel + 1}`,
                    plating: part.plating,
                    price: part.prices[part.selectedModel]
                };
            });

            // Create the FormData object
            const formData = new FormData();
            
            // Add all required fields
            formData.append('action', 'pc_add_to_cart');
            formData.append('security', productData.security); // Use the nonce from productData
            formData.append('product_id', productData.id);
            formData.append('quantity', '1');
            formData.append('custom_price', customPrice.toString());
            formData.append('parts', JSON.stringify(formattedParts));

            // Make the AJAX request using the URL from productData
            const response = await fetch(productData.ajax_url, {
                method: 'POST',
                credentials: 'same-origin',
                body: formData
            });

            const responseData = await response.json();

            if (!responseData.success) {
                throw new Error(responseData.data?.message || 'Failed to add product to cart');
            }

            // Success handling
            document.body.dispatchEvent(new Event('wc_fragment_refresh'));
            alert('Product added to cart successfully!');

        } catch (error) {
            console.error('Add to cart error:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button 
                onClick={handleAddToCart}
                disabled={isLoading}
                className="add-to-cart-button"
            >
                {isLoading ? 'Adding...' : 'Add to Cart'}
            </button>
            {error && (
                <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>
                    {error}
                </div>
            )}
        </div>
    );
};

export default AddToCartButton;