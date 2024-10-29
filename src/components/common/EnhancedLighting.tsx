import React from 'react';
import { Environment } from '@react-three/drei';
import { useControls } from 'leva';

function EnhancedLighting() {
  // Create Leva controls for environment rotation
  const { rotationX, rotationY, rotationZ } = useControls('Environment Rotation', {
    rotationX: {
      value: 0,
      min: -Math.PI,
      max: Math.PI,
      step: 0.1,
      label: 'Rotation X'
    },
    rotationY: {
      value: Math.PI / 3, // Initial value from your original code
      min: -Math.PI,
      max: Math.PI,
      step: 0.1,
      label: 'Rotation Y'
    },
    rotationZ: {
      value: 0,
      min: -Math.PI,
      max: Math.PI,
      step: 0.1,
      label: 'Rotation Z'
    }
  });

  // Add optional intensity control
  const { envIntensity } = useControls('Environment Settings', {
    envIntensity: {
      value: 0.6,
      min: 0,
      max: 2,
      step: 0.1,
      label: 'Environment Intensity'
    }
  });

  return (
    <>
      {/* Environment map for overall reflections */}
      <Environment
        files="./Studio.hdr"
        environmentRotation={[rotationX, rotationY, rotationZ]}
        environmentIntensity={envIntensity}
      />
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.2} color="#FFFFFF" />
    </>
  );
}

export default EnhancedLighting;


    // //   {/* Main front light */}
    //   <directionalLight
    //     castShadow
    //     position={[0, 0, 5]}
    //     intensity={1.2}
    //     color="#FFF9E5"
    //   />
     
    // //   {/* Rim lights to create outline effect */}
    //   <spotLight
    //     castShadow
    //     position={[-5, 0, -2]}
    //     intensity={0.8}
    //     color="#FFFFFF"
    //     angle={Math.PI / 4}
    //     penumbra={0.2}
    //   />
     
    //   <spotLight
    //     castShadow
    //     position={[5, 0, -2]}
    //     intensity={0.8}
    //     color="#FFFFFF"
    //     angle={Math.PI / 4}
    //     penumbra={0.2}
    //   />
    // //   {/* Top rim light */}
    //   <spotLight
    //     castShadow
    //     position={[0, 5, -2]}
    //     intensity={0.6}
    //     color="#FFFFFF"
    //     angle={Math.PI / 4}
    //     penumbra={0.2}
    //   />
    // //   {/* Subtle fill light from bottom */}
    //   <spotLight
    //     castShadow
    //     position={[0, -5, 2]}
    //     intensity={0.3}
    //     color="#FFE5CC"
    //     angle={Math.PI / 4}
    //     penumbra={0.5}
    //   />