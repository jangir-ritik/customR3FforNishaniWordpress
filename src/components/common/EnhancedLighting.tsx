import React from 'react';
import { Environment } from '@react-three/drei';
// import { useControls, folder } from 'leva';

function EnhancedLighting() {
  // Create Leva controls grouped in folders
  // const envControls = useControls('Environment', {
  //   rotation: folder({
  //     rotationX: {
  //       value: 0,
  //       min: -Math.PI,
  //       max: Math.PI,
  //       step: 0.1,
  //       label: 'Rotation X'
  //     },
  //     rotationY: {
  //       value: Math.PI * .445,
  //       min: -Math.PI,
  //       max: Math.PI,
  //       step: 0.1,
  //       label: 'Rotation Y'
  //     },
  //     rotationZ: {
  //       value: 0,
  //       min: -Math.PI,
  //       max: Math.PI,
  //       step: 0.1,
  //       label: 'Rotation Z'
  //     }
  //   }),
  //   intensity: {
  //     value: 0.7,
  //     min: 0,
  //     max: 2,
  //     step: 0.05,
  //     label: 'Environment Intensity'
  //   }
  // });

  // // Add controls for the three directional lights
  // const lightControls = useControls('Directional Lights', {
  //   light2: folder({
  //     position2: { value: [0, 5, 10], step: 1, label: 'Position' },
  //     intensity2: { value: 0.4, min: 0, max: 2, step: 0.1, label: 'Intensity' },
  //     color2: { value: '#ffffff', label: 'Color' },
  //     visible2: { value: true, label: 'Visible' }
  //   }),
  // });

  return (
    <>
      {/* Environment map for overall reflections */}
      {/* <Environment
        files="./Studio.hdr"
        environmentRotation={[envControls.rotationX, envControls.rotationY, envControls.rotationZ]}
        environmentIntensity={envControls.intensity}
      />
      
      <directionalLight
        position={lightControls.position2}
        intensity={lightControls.intensity2}
        color={lightControls.color2}
        visible={lightControls.visible2}
      /> */}
            <Environment
        files="./Studio.hdr"
        environmentRotation={[0, Math.PI / 3, 0]}
        environmentIntensity={0.8}
      />
      
      <directionalLight
        position={[0, 5, 10]}
        intensity={0.8}
        color={'#ffffff'}
        visible={true}
      />
    </>
  );
}

export default EnhancedLighting;