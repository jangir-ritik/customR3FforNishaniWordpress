import React, { Suspense, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Environment, Html, OrbitControls, PresentationControls } from '@react-three/drei';
import Bracelet from '../../Bracelet';
import Necklace from '../../Necklace';

interface ProductViewProps {
  productType: 'necklace' | 'bracelet';
}

const ProductView = memo(({ productType }: ProductViewProps) => {
  // Memoize camera settings
  const cameraSettings = React.useMemo(() => ({
    // position: [0, 0, productType === 'necklace' ? 10 : 15],
    position: [0, 0, 12],
    fov: 50
  }), [productType]);

  // Memoize presentation control settings
  const presentationSettings = React.useMemo(() => ({
    global: true,
    config: { mass: 2, tension: 500 },
    snap: { mass: 4, tension: 100 },
    rotation: [Math.PI / 2, 0, 0],
    polar: [-Math.PI / 3, Math.PI / 3],
    azimuth: [-Math.PI / 1.4, Math.PI / 2]
  }), []);

  return (
    <Canvas
      dpr={[1, 2]}
      camera={cameraSettings}
      style={{
        touchAction: 'none',
        WebkitTapHighlightColor: 'transparent',
        WebkitUserSelect: 'none',
        userSelect: 'none'
      }}
    >
      {/* <color attach="background" args={['#f4f0ed']} /> */}
      <Suspense fallback={<Html center />}>
        <PresentationControls {...presentationSettings}>
          {productType === 'necklace' ? <Necklace /> : <Bracelet />}
        </PresentationControls>
        <Environment files="./5.exr" environmentIntensity={0.8}  />
        {/* <spotLight
          position={[0, 0, 0]}
          intensity={4}
          angle={0.6}
          penumbra={0.5}
          castShadow
        />

        <spotLight
          position={[-10, 4, -10]}
          intensity={0.2}
          angle={0.7}
          penumbra={0.5}
        />
        <ambientLight intensity={0.2} /> */}
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
});

export default ProductView;
