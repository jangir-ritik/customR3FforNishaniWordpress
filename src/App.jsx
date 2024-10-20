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
import useProductStore from './store/store';

const App = () => {
  console.log('loading successful');
  const setProductData = useProductStore(state => state.setProductData);
  const productData = useProductStore(state => state.productData);

  useEffect(() => {
    if (window.productData) {
      console.log('Product data from WordPress:', window.productData);
      setProductData(window.productData);
    } else {
      console.error('No product data found.');
    }
  }, [setProductData]);

  // if (!productData) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="tdt-product-customization-page">
      <div className="tdt-product-customization-left-section">
        <div className="tdt-product-3d-view">
          <Canvas dpr={[1,2]} camera={{ position:[0,0,300], fov:50 }}>
            <color attach="background" args={['#f4f0ed']} />
            <Suspense fallback={<Html center>Loading...</Html>}>
              <PresentationControls
                global
                config={{ mass:2, tension:500 }}
                snap={{ mass:4, tension:100 }}
                rotation={[-Math.PI/2,0,0]}
                polar={[-Math.PI/3, Math.PI/3]}
                azimuth={[-Math.PI/1.4, Math.PI/2]}
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
          <MetalSelector key="metal-selector" />
        </div>
        <hr style={{width: '100%', color: '#00000010', margin: 0}}/>
        <ProductDetails />
        <hr style={{width: '100%', color: '#00000010', margin: 0}}/>
        <div className="tdt-product-price-cart-wrapper">
          <PriceDisplay />
          <AddToCartButton />
        </div>
      </div>
    </div>
  );
};

export default App;