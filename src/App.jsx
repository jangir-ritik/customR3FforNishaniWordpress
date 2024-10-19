import './App.css';
import './styles/CustomStyles.scss'; // Import the updated SCSS
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Html, PresentationControls, OrbitControls } from '@react-three/drei';
import Test from './Test';

import ProductHeader from './components/common/ProductHeader';
import ProductDescription from './components/common/ProductDescription';
import ChainCustomizer from './components/common/ChainCustomizer';
import StyleSelector from './components/common/StyleSelector';
import MetalSelector from './components/common/MetalSelector';
import DetailsAccordion from './components/common/DetailsAccordion';
import PriceDisplay from './components/common/PriceDisplay';
import AddToCartButton from './components/common/AddToCartButton';

const App = () => {
  console.log('loading successful');
  
  return (
      <div className="custom-product-customization-page">
          <div className="custom-product-customization-page-left-section">
              <div style={{ width:'100%', height:'70vh', position:'relative' }}>
                  <Canvas dpr={[1,2]} camera={{ position:[0,0,300], fov :50 }}>
                      <color attach="background" args={['#f4f0ed']} />
                      <Suspense fallback={<Html center>Loading...</Html>}>
                          <PresentationControls
                              global
                              config={{ mass :2, tension :500 }}
                              snap={{ mass :4, tension :100 }}
                              rotation={[-Math.PI /2,0,0]}
                              polar={[-Math.PI /3, Math.PI /3]}
                              azimuth={[-Math.PI /1.4 , Math.PI /2]}
                          >
                              <Test />
                          </PresentationControls>
                          <Environment preset="warehouse" environmentRotation={[Math.PI ,0 ,Math.PI]} />
                      </Suspense>
                      {/* <OrbitControls /> */}
                  </Canvas>
              </div>
          </div>
          <div className="custom-product-customization-page-right-section">
              <ProductHeader />
              <ProductDescription />
              <ChainCustomizer />
              <div className="custom-product-customization-page-right-style-metal-selector-wrapper">
                  <StyleSelector />
                  <MetalSelector key="metal-selector" />
              </div>
              <DetailsAccordion />
              <div className="custom-product-customization-page-right-price-add-to-cart-wrapper">
                  <PriceDisplay />
                  <AddToCartButton />
              </div>
          </div>
      </div>
  );
};

export default App;