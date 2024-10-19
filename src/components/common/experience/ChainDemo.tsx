import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Html, PresentationControls, ContactShadows, OrbitControls } from '@react-three/drei';
import Test from './Test';

export default function ChainDemo() {
  return (
    <div style={{ width: '100%', height: '70vh', position: 'relative' }}>
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
          <Environment preset="warehouse" environmentRotation={[Math.PI , 0, Math.PI]} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}