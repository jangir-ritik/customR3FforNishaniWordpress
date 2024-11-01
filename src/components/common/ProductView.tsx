import React, { Suspense, memo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, PresentationControls } from '@react-three/drei';
import Bracelet from '../../Bracelet';
import Necklace from '../../Necklace';
import EnhancedLighting from './EnhancedLighting';
import { SSAO, EffectComposer, Bloom } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

interface ProductViewProps {
  productType: 'necklace' | 'bracelet';
}

const ProductView = memo(({ productType }: ProductViewProps) => {
  const orbitControlsRef = useRef();

  const initialCameraSettings = React.useMemo(() => ({
    position: [0, 0, 12],
    fov: 50
  }), []);

  const presentationSettings = React.useMemo(() => ({
    global: true,
    config: { mass: 2, tension: 500 },
    snap: { mass: 4, tension: 100 },
    rotation: [Math.PI / 2, 0, 0],
    polar: [-Math.PI / 3, Math.PI / 3],
    azimuth: [-Math.PI / 1.4, Math.PI / 2]
  }), []);

  // Optimize SSAO settings for jewelry
  const ssaoSettings = React.useMemo(() => ({
    blendFunction: BlendFunction.MULTIPLY,
    samples: 64,           // Increased samples for smoother gradients
    rings: 7,             // Keep wider sampling
    distanceScale: 5.0,   // Keep distance scale
    distanceThreshold: 1.0, // Keep distance threshold
    distanceFalloff: 0.8,  // Increased for smoother falloff (0.5 -> 0.8)
    rangeThreshold: 0.01,  // Reduced for softer transitions (0.05 -> 0.01)
    rangeFalloff: 0.01,    // Reduced for softer transitions (0.05 -> 0.01)
    luminanceInfluence: 0.3, // Increased to consider surface brightness (0.1 -> 0.3)
    radius: 50,           // Keep large radius
    scale: 1.0,           // Reduced for subtler effect (3.0 -> 1.0)
    bias: 0.025,          // Increased to reduce self-shadowing (0.01 -> 0.025)
    intensity: 5.0,       // Reduced for less harsh shadows (10.0 -> 5.0)
    color: new THREE.Color('#1a1a1a'), // Lighter shadow color (pure black -> dark gray)
  }), []);

  // Optimize Bloom settings for jewelry
  const bloomSettings = React.useMemo(() => ({
    luminanceThreshold: 0.85,  // Lower threshold to catch more highlights
    luminanceSmoothing: 0.3,   // Smooth transitions
    intensity: 0.45,           // Reduced intensity for subtle effect
    levels: 6,                 // Balanced quality and performance
    mipmapBlur: true
  }), []);

  const handleReset = () => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.reset();
    }
  };

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <div
        className='tdt-product-reset-view'
        onClick={handleReset}
      >
        <img title='reset view' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtcmVmcmVzaC1jdyI+PHBhdGggZD0iTTMgMTJhOSA5IDAgMCAxIDktOSA5Ljc1IDkuNzUgMCAwIDEgNi43NCAyLjc0TDIxIDgiLz48cGF0aCBkPSJNMjEgM3Y1aC01Ii8+PHBhdGggZD0iTTIxIDEyYTkgOSAwIDAgMS05IDkgOS43NSA5Ljc1IDAgMCAxLTYuNzQtMi43NEwzIDE2Ii8+PHBhdGggZD0iTTggMTZIM3Y1Ii8+PC9zdmc+" />
      </div>
      <Canvas
        dpr={[1, 2]}
        camera={initialCameraSettings}
        gl={{
          preserveDrawingBuffer: true,
          antialias: true,

        }}
        style={{
          touchAction: 'none',
          WebkitTapHighlightColor: 'transparent',
          WebkitUserSelect: 'none',
          userSelect: 'none'
        }}
      >
        <color attach="background" args={['#f4f0ed']} />
        <Suspense fallback={null}>
          <EnhancedLighting />
          <EffectComposer enableNormalPass={true} multisampling={4}>
            <SSAO {...ssaoSettings} />
            <Bloom {...bloomSettings} />
          </EffectComposer>

          <OrbitControls
            ref={orbitControlsRef}
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />

          <PresentationControls {...presentationSettings}>
            {productType === 'necklace' ? <Necklace /> : <Bracelet />}
          </PresentationControls>
        </Suspense>
        {/* <Perf deepAnalyze={true} minimal={false} charts={true} position="bottom-left" /> */}
      </Canvas>
    </div>
  );
});

export default ProductView;