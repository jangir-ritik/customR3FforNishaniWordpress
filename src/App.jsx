import React, { useEffect, useCallback } from 'react';
import ProductHeader from './components/common/ProductHeader';
import ProductDescription from './components/common/ProductDescription';
import ChainCustomizer from './components/common/ChainCustomizer';
import StyleSelector from './components/common/StyleSelector';
import MetalSelector from './components/common/MetalSelector';
import ProductDetails from './components/common/ProductDetails';
import PriceDisplay from './components/common/PriceDisplay';
import AddToCartButton from './components/common/AddToCartButton';
import useProductStore from './store/store';
import ProductView from './components/common/ProductView';
import ProductImages from './components/common/ProductImages';

const App = () => {
  console.log('loading successful');
  const setProductData = useProductStore(state => state.setProductData);
  const setProductType = useProductStore(state => state.setProductType);
  const productType = useProductStore(state => state.productType);
  const totalPrice = useProductStore(state => state.totalPrice);

  // const productData = useProductStore(state => state.productData);
  const productData = {
    "id": "5460",
    "name": "Custom Necklace",
    "description": "Craft your unique style with our custom bracelets and necklaces, designed to reflect your personal touch. Choose from a selection of elegant chains and signature locks, mix and match to create jewelry as unique as you. Make your mark with timeless pieces tailored just for you!\r\n\r\n<strong>Material : </strong>Sterling Silver 925\r\n<strong>Plating : </strong>Rhodium and yellow gold\r\n<strong>Size</strong> : 15 + 3 inches (extension)\r\n<strong>AntiTarnish</strong>\r\n<p data-darkreader-inline-color=\"\">*Please note that slight color variations may occur due to photoshoot conditions and studio lighting settings.</p>",
    "price": "11100",
    "regular_price": "11100",
    "sale_price": "",
    "image_url": "https://nishanistudio.com/wp-content/uploads/426-5.png",
    "gallery_images": [
      {
        "id": "4734",
        "url": "https://nishanistudio.com/wp-content/uploads/426-5.png",
        "alt": "",
        "caption": ""
      },
      {
        "id": 6690,
        "url": "https://nishanistudio.com/wp-content/uploads/Home-banner-img-change-1.png",
        "alt": "",
        "caption": ""
      }
    ],
    "attributes": {
      "Right Chain Plating": [
        "Gold",
        "Rhodium"
      ],
      "Additional Chain": [
        "Model 1",
        "Model 2",
        "Model 3",
        "Model 4",
        "Model 5",
        "Model 6",
        "null"
      ],
      "Additional Chain Plating": [
        "Gold",
        "Rhodium",
        "null"
      ],
      "Left Chain Plating": [
        "Gold",
        "Rhodium"
      ],
      "Bottom Lock": [
        "Model 1",
        "Model 2",
        "Model 3",
        "Model 4",
        "Model 5",
        "Model 6"
      ],
      "Bottom Lock Plating": [
        "Gold",
        "Rhodium"
      ],
      "Top Lock": [
        "Model 1",
        "Model 2",
        "Model 3",
        "Model 4",
        "Model 5",
        "Model 6"
      ],
      "Top Lock Plating": [
        "Gold",
        "Rhodium"
      ]
    },
    "variations": [],
    "jewelry_parts": {
      "leftChain": {
        "label": "Crub Chain",
        "model": "Model-1",
        "price": 3600,
        "plating": "gold"
      },
      "rightChain": {
        "label": "Crub Chain",
        "model": "Model-1",
        "price": 3600,
        "plating": "gold"
      },
      "additionalChain": {
        "label": "null",
        "model": "null",
        "price": 0,
        "plating": "null"
      },
      "bottomLock": {
        "label": "Signature Lock",
        "model": "Model-1",
        "price": 1900,
        "plating": "gold"
      },
      "topLock": {
        "label": "Signature Lock",
        "model": "Model-1",
        "price": 1900,
        "plating": "gold"
      }
    }
  }

  useEffect(() => {
    try {
      // Find the main element with cms-main class
      const mainElement = document.getElementById('cms-main');
      const headerElement = document.getElementById('cms-header');

      if (mainElement) {
        // Remove the cms-main class
        mainElement.classList.remove('cms-main');

        // Optional: Log success for debugging
        console.log('Successfully removed cms-main class');
      } else {
        console.warn('Main element with cms-main class not found');
      }

      if (headerElement) {
        headerElement.classList.remove('header-shadow');
        headerElement.classList.add('custom-bottom-border');
        console.log('Successfully removed header-shadow class');
      } else {
        console.warn('Header element with header-shadow class not found');
      }

    } catch (error) {
      // Log any errors that occur during the process
      console.error('Error removing cms-main class:', error);
    }

    // Cleanup function (optional)
    return () => {
      try {
        const mainElement = document.getElementById('cms-main');
        if (mainElement && !mainElement.classList.contains('cms-main')) {
          mainElement.classList.add('cms-main');
        }
        const headerElement = document.getElementById('cms-header');
        if (headerElement && headerElement.classList.contains('custom-bottom-border')) {
          headerElement.classList.add('header-shadow');
          headerElement.classList.remove('custom-bottom-border');
        }
      } catch (error) {
        console.error('Error in cleanup:', error);
      }
    };
  }, []);

  useEffect(() => {
    // if (window.productData) {
    if (productData) {
      // console.log('Product data from WordPress:', window.productData);
      console.log('Product data from WordPress:', productData);
      // setProductData(window.productData);
      setProductData(productData);
    } else {
      console.error('No product data found.');
    }
  }, [setProductData]);

  const handleProductTypeChange = useCallback(() => {
    setProductType(productType === 'necklace' ? 'bracelet' : 'necklace');
  }, [productType, setProductType]);


  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tdt-product-customization-page">
      {/* <button
        style={{ position: 'absolute', top: '140px', left: 0, padding: 10 }}
        onClick={handleProductTypeChange}
      >
        {productType === 'necklace' ? 'Necklace' : 'Bracelet'}
      </button> */}

      <div className="tdt-product-customization-left-section">
        <div className="tdt-product-3d-view">
          <ProductView productType={productType} />
        </div>
        {/* in mobile, the chain customizer needs to be here */}
        <ChainCustomizer />
        <div className="tdt-product-style-metal-wrapper">
          <StyleSelector />
          <MetalSelector />
        </div>
        <ProductImages gallery_images={productData.gallery_images} />
        <ProductDetails />
      </div>

      <div className="tdt-product-customization-right-section">
        <ProductHeader />
        <ProductDescription />
        {/* in desktop, the chain customizer needs to be here */}
        <ChainCustomizer />
        <div className="tdt-product-style-metal-wrapper">
          <StyleSelector />
          <MetalSelector />
        </div>
        <hr className='tdt-product-details-divider hide-on-mobile' />
        <ProductDetails />
        <hr className='tdt-product-details-divider hide-on-mobile' />
        <div className="tdt-product-price-cart-wrapper">
          <PriceDisplay key={totalPrice} />
          <AddToCartButton />
        </div>
      </div>
    </div>
  );
};

export default App;
