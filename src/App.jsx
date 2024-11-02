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

  const productData = useProductStore(state => state.productData);
  // const productData = {
  //     "id": "4712",
  //     "name": "Twist Link Necklace",
  //     "description": "Introducing our pre-designed necklaces, curated to perfectly pair our signature chains and locks for a bold, effortless look. From the strikingly bold chains to classic delicate ones or our signature diamond-cut chain, each piece offers a unique combination of modern style and timeless elegance. Featuring iconic locks like the hexagonal hammered texture or the sleek high-polish finish, these necklaces are designed to make a statement.While each look is ready to wear, you can still make it your own! Whether you want to add, remove, or swap elements, our designs are fully customizable, allowing you to create a piece that reflects your personal style.\r\n<ul>\r\n \t<li>Material- Sterling Silver 925</li>\r\n \t<li>Plating- Rhodium and yellow gold</li>\r\n \t<li>Size- 18 inch</li>\r\n \t<li>AntiTarnish</li>\r\n</ul>\r\n<p style=\"color: #666666; font-size: 15px;\" data-darkreader-inline-color=\"\">*Please note that slight color variations may occur due to photoshoot conditions and studio lighting settings.</p>",
  //     "price": "14300",
  //     "regular_price": "14300",
  //     "sale_price": "",
  //     "image_url": "https://nishanistudio.com/wp-content/uploads/428-17.png",
  //     "gallery_images": [
  //       {
  //         "id": "4731",
  //         "url": "https://nishanistudio.com/wp-content/uploads/428-17.png",
  //         "alt": "",
  //         "caption": ""
  //       },
  //       {
  //         "id": 4732,
  //         "url": "https://nishanistudio.com/wp-content/uploads/428136.png",
  //         "alt": "",
  //         "caption": ""
  //       }
  //     ],
  //     "attributes": {
  //       "pa_right-chain": [
  //         125,
  //         126,
  //         127,
  //         128,
  //         129
  //       ],
  //       "pa_left-chain": [
  //         114,
  //         118,
  //         117,
  //         115,
  //         119
  //       ],
  //       "pa_front-lock": [
  //         123,
  //         124,
  //         134,
  //         135,
  //         136
  //       ],
  //       "pa_back-lock": [
  //         121,
  //         122,
  //         137,
  //         138,
  //         139
  //       ]
  //     },
  //     "variations": [],
  //     "default_attributes": [],
  //     "jewelry_parts": {
  //       "leftChain": {
  //         "label": "Signature diamond-cut chain (Smll Link)",
  //         "model": "Model-3",
  //         "price": 6500,
  //         "plating": "gold"
  //       },
  //       "rightChain": {
  //         "label": "Crub Chain",
  //         "model": "Model-1",
  //         "price": 3600,
  //         "plating": "gold"
  //       },
  //       "additionalChain": {
  //         "label": "none",
  //         "model": "null",
  //         "price": 0,
  //         "plating": "null"
  //       },
  //       "bottomLock": {
  //         "label": "Hexagonal Textured Lock",
  //         "model": "Model-3",
  //         "price": 2300,
  //         "plating": "silver"
  //       },
  //       "topLock": {
  //         "label": "Signature lock",
  //         "model": "Model-1",
  //         "price": 1900,
  //         "plating": "gold"
  //       }
  //     }
  //   }

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
    if (window.productData) {
      // if (productData) {
      console.log('Product data from WordPress:', window.productData);
      // console.log('Product data from WordPress:', productData);
      setProductData(window.productData);
      // setProductData(productData);
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
