import React, { Suspense, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Html, PresentationControls } from '@react-three/drei';
import Bracelet from '../../Bracelet';
import Necklace from '../../Necklace';

interface ProductViewProps {
  productType: 'necklace' | 'bracelet';
}

const ProductView = memo(({ productType }: ProductViewProps) => {
  // Memoize camera settings
  console.log('productType', productType);
  const cameraSettings = React.useMemo(() => ({
    position: [0, 0, productType === 'necklace' ? 15 : 20],
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
  }), [productType]);

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
        <color attach="background" args={['#f4f0ed']} />
        <Suspense fallback={<Html center className="tdt-3d-loader" />}>
          <PresentationControls {...presentationSettings}>
            {productType === 'necklace' ? <Necklace /> : <Bracelet />}
          </PresentationControls>
          <Environment files="./2.hdr" />
        </Suspense>
      </Canvas>
  );
});

export default ProductView;
