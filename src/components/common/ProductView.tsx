import React, { Suspense, lazy, memo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, PresentationControls } from '@react-three/drei';
import EnhancedLighting from './EnhancedLighting';
import { SSAO, EffectComposer, Bloom } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import ProductViewerButtons from './ProductViewerButtons';
import HelpModal from './HelpModal';
import Bracelet from '../../Bracelet';
import Necklace from '../../Necklace';
import WebGL from 'three/addons/capabilities/WebGL.js';

// // Lazy load the components
// const Bracelet = lazy(() => import('../../Bracelet'));
// const Necklace = lazy(() => import('../../Necklace'));

interface ProductViewProps {
  productType: 'necklace' | 'bracelet';
}

const ProductView = memo(({ productType }: ProductViewProps) => {
  const orbitControlsRef = useRef();

  const initialCameraSettings = React.useMemo(() => ({
    position: [0, 0, 30],
    fov: 1
  }), []);

  const presentationSettings = React.useMemo(() => ({
    global: true,
    config: { mass: 2, tension: 500 },
    snap: { mass: 4, tension: 100 },
    rotation: [Math.PI / 2, 0, 0],
    polar: [-Math.PI / 3, Math.PI / 3],
    azimuth: [-Math.PI / 1.4, Math.PI / 2]
  }), []);

  // Add zoom constraints to OrbitControls
  const orbitControlsSettings = React.useMemo(() => ({
    minDistance: 25, // Minimum zoom level (closer to object)
    maxDistance: 100, // Maximum zoom level (further from object)
    enableZoom: true,
    enablePan: true,
    enableRotate: true,
    minPolarAngle: Math.PI / 3,
    maxPolarAngle: Math.PI / 1.5,
    zoomSpeed: 0.5 // Reduce zoom speed for more controlled zooming (default is 1.0)
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

  const [showHelp, setShowHelp] = React.useState(false);

  const handleInfo = () => {
    setShowHelp(true);
  };

  // Component selection based on productType
  const ProductComponent = productType === 'necklace' ? Necklace : Bracelet;

  // Add WebGL detection
  const [isWebGLSupported] = React.useState(() => WebGL.isWebGLAvailable());
  console.log(isWebGLSupported, 'isWebGLSupported')
  // Add fallback render logic
  if (!isWebGLSupported) {
    return (
      <div style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        backgroundColor: '#f4f0ed',
      }}>
        <p style={{
          textAlign: 'center',
          color: '#666',
          maxWidth: '400px'
        }}>
          Your browser doesn't support 3D viewing.
          Please use a modern browser like Chrome, Firefox, or Safari for the full experience.
        </p>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      {showHelp && <HelpModal setShowHelp={setShowHelp} />}
      <ProductViewerButtons handleInfo={handleInfo} handleReset={handleReset} />
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
            {...orbitControlsSettings}
          />

          <PresentationControls {...presentationSettings}>
            <ProductComponent />
          </PresentationControls>
        </Suspense>
        {/* <Perf deepAnalyze={true} minimal={false} charts={true} position="bottom-left" /> */}
      </Canvas>
    </div>
  );
});

export default ProductView;