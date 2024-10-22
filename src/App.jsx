import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Html, OrbitControls, PresentationControls } from '@react-three/drei';
import Test from './Test';
import ProductHeader from './components/common/ProductHeader';
import ProductDescription from './components/common/ProductDescription';
import ChainCustomizer from './components/common/ChainCustomizer';
import StyleSelector from './components/common/StyleSelector';
import MetalSelector from './components/common/MetalSelector';
import ProductDetails from './components/common/ProductDetails';
import PriceDisplay from './components/common/PriceDisplay';
import AddToCartButton from './components/common/AddToCartButton';
// import useProductStore from './store/store';

const App = () => {
  console.log('loading successful');
  // const setProductData = useProductStore(state => state.setProductData);
  // const productData = useProductStore(state => state.productData);
  // const productData = {
  //   "id": "4712",
  //   "name": "Twist Link Necklace",
  //   "productType": "necklace",
  //   "description": "Introducing our pre-designed necklaces, curated to perfectly pair our signature chains and locks for a bold, effortless look. From the strikingly bold chains to classic delicate ones or our signature diamond-cut chain, each piece offers a unique combination of modern style and timeless elegance. Featuring iconic locks like the hexagonal hammered texture or the sleek high-polish finish, these necklaces are designed to make a statement.While each look is ready to wear, you can still make it your own! Whether you want to add, remove, or swap elements, our designs are fully customizable, allowing you to create a piece that reflects your personal style.\r\n<ul>\r\n \t<li>Material- Sterling Silver 925</li>\r\n \t<li>Plating- Rhodium and yellow gold</li>\r\n \t<li>Size- 18 inch</li>\r\n \t<li>AntiTarnish</li>\r\n</ul>\r\n<p style=\"color: #666666; font-size: 15px;\">*Please note that slight color variations may occur due to photoshoot conditions and studio lighting settings.</p>",
  //   "price": "17000",
  //   "regular_price": "17000",
  //   "sale_price": "",
  //   "image_url": "https://nishanistudio.com/wp-content/uploads/428-17.png",
  //   "attributes": {
  //     "pa_right-chain": [
  //       125,
  //       126,
  //       127,
  //       128,
  //       129
  //     ],
  //     "pa_left-chain": [
  //       114,
  //       118,
  //       117,
  //       115,
  //       119
  //     ],
  //     "pa_front-lock": [
  //       123,
  //       124,
  //       134,
  //       135,
  //       136
  //     ],
  //     "pa_back-lock": [
  //       121,
  //       122,
  //       137,
  //       138,
  //       139
  //     ]
  //   },
  //   "variations": [],
  //   "default_attributes": [],
  //   "jewelry_parts": {
  //     "leftChain": {
  //       "label": "simple_13_B",
  //       "model": "Model-4",
  //       "price": 4000,
  //       "plating": "gold"
  //     },
  //     "rightChain": {
  //       "label": "curb_chain",
  //       "model": "Model-1",
  //       "price": 3600,
  //       "plating": "silver"
  //     },
  //     "additionalChain": {
  //       "label": "simple_with_diamond",
  //       "model": "Model-6",
  //       "price": 8800,
  //       "plating": "gold"
  //     },
  //     "lockBottom": {
  //       "label": "hexagonal_textured_lock",
  //       "model": "Model-3",
  //       "price": 2300,
  //       "plating": "silver"
  //     },
  //     "lockTop": {
  //       "label": "signature_lock",
  //       "model": "Model-1",
  //       "price": 1900,
  //       "plating": "gold"
  //     }
  //   }
  // }

  // useEffect(() => {
  //   // if (window.productData) {
  //     if (productData) {
  //     // console.log('Product data from WordPress:', window.productData);
  //     console.log('Product data from WordPress:', productData);
  //     // setProductData(window.productData);
  //     setProductData(productData);
  //   } else {
  //     console.error('No product data found.');
  //   }
  // }, [setProductData]);

  // if (!productData) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="tdt-product-customization-page">
      {/* <sup style={{position: 'absolute', top: 0, left: 0}}>{productData?.productType === 'necklace' ? 'Necklace' : 'Bracelet'}</sup> */}
      <div className="tdt-product-customization-left-section">
        <div className="tdt-product-3d-view">
          <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 300], fov: 50 }}>
            <color attach="background" args={['#f4f0ed']} />
            <Suspense fallback={<Html center>Loading...</Html>}>
              <PresentationControls
                global
                config={{ mass: 2, tension: 500 }}
                snap={{ mass: 4, tension: 100 }}
                rotation={[-Math.PI / 2, 0, 0]}
                polar={[-Math.PI / 3, Math.PI / 3]}
                azimuth={[-Math.PI / 1.4, Math.PI / 2]}
              >
                <Test />
              </PresentationControls>
              <Environment files="./2.hdr" />
            </Suspense>
          </Canvas>
        </div>
      </div>
      <div className="tdt-product-customization-right-section">
        <ProductHeader />
        <ProductDescription />
        <ChainCustomizer />
        <div className="tdt-product-style-metal-wrapper">
          <StyleSelector />
          <MetalSelector />
        </div>
        <hr style={{ width: '100%', color: '#00000010', margin: 0 }} />
        <ProductDetails />
        <hr style={{ width: '100%', color: '#00000010', margin: 0 }} />
        <div className="tdt-product-price-cart-wrapper">
          <PriceDisplay />
          <AddToCartButton />
        </div>
      </div>
    </div>
  );
};

export default App;
