// import React, { useRef, useEffect, useState } from 'react';
// import { useGLTF, useAnimations } from '@react-three/drei';
// import useProductStore from '@/app/store/store';

// export default function Model007({ ...props }) {
//   const group = useRef();
//   const { nodes, materials, animations } = useGLTF('/element007.gltf');
//   const { actions } = useAnimations(animations, group);
//   const { metalColor, selectedChain } = props;
//   const [goldMaterial, setGoldMaterial] = useState(materials.Gold);
//   const [silverMaterial, setSilverMaterial] = useState(materials.Silver);
//   const { selectedLeftChainModel } = useProductStore(state => state)

//   useEffect(() => {
//     Object.values(actions).forEach(action => action.play());
//   }, [actions]);

//   useEffect(() => {
//     if (metalColor === 'gold') {
//       setGoldMaterial(materials.Gold);
//       setSilverMaterial(materials.Gold);
//     } else if (metalColor === 'silver') {
//       setGoldMaterial(materials.Silver);
//       setSilverMaterial(materials.Silver);
//     }
//   }, [metalColor, materials]);

//   return (
//     <group ref={group} {...props} dispose={null}>
//       <group name="Scene">
//         <mesh
//           name="R1"
//           geometry={nodes.R1.geometry}
//           material={silverMaterial}
//           position={[-0.000367, -0.000189, 0]}
//           scale={[0.018901, 1.002097, 0.018901]}
//           visible={selectedChain !== 'Right Chain'}
//         />
//         <mesh
//           name="L1"
//           geometry={nodes.L1.geometry}
//           material={silverMaterial}
//           position={[-0.000367, -0.000189, 0]}
//           // rotation={[0, 0, Math.PI]}
//           scale={[0.018901, 1.002097, 0.018901]}
//           visible={selectedChain !== 'Right Chain'}
//         />
//         <mesh
//           name="R2"
//           geometry={nodes.R2.geometry}
//           material={goldMaterial}
//           position={[-0.000367, -0.000189, 0]}
//           scale={[0.018901, 1.002097, 0.018901]}
//           visible={selectedChain !== 'Left Chain'}
//         />
//         <mesh
//           name="L2"
//           geometry={nodes.L2.geometry}
//           material={goldMaterial}
//           position={[-0.000367, -0.000189, 0]}
//           // rotation={[0, 0, Math.PI]}
//           scale={[0.018901, 1.002097, 0.018901]}
//           visible={selectedChain !== 'Left Chain'}
//         />
//       </group>
//     </group>
//   );
// }

// useGLTF.preload('/element007.gltf');


import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import useProductStore from '@/app/store/store';

export default function Model007(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/element007.gltf');
  const { actions, names } = useAnimations(animations, group);
  
  const { selectedLeftChainModel, selectedRightChainModel, selectedMetal } = useProductStore();

  useEffect(() => {
    console.log('Available animations:', names);
    console.log('Actions:', actions);

    // Attempt to play all animations
    names.forEach(name => {
      if (actions[name]) {
        console.log(`Playing animation: ${name}`);
        actions[name].reset().play();
      } else {
        console.warn(`Animation ${name} not found in actions`);
      }
    });

    // If there are no named animations, try playing all actions
    if (names.length === 0) {
      Object.values(actions).forEach(action => {
        console.log(`Playing unnamed action`);
        action.reset().play();
      });
    }

    // Cleanup function to stop animations when component unmounts
    return () => {
      Object.values(actions).forEach(action => action.stop());
    };
  }, [actions, names]);

  const chainMaterial = new THREE.MeshStandardMaterial({
    color: selectedMetal === 'gold' ? 0xffd700 : 0xc0c0c0,
    metalness: 0.8,
    roughness: 0.2,
  });

  const getChainGeometry = (side, model) => {
    const nodeName = `${side}${model}`;
    return nodes[nodeName]?.geometry || nodes[`${side}1`].geometry;
  };

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="LeftChain"
          geometry={getChainGeometry('L', selectedLeftChainModel)}
          material={chainMaterial}
          position={[-0.000367, -0.000189, 0]}
          rotation={[0, 0, Math.PI]}
          scale={[0.018901, 1.002097, 0.018901]}
        />
        <mesh
          name="RightChain"
          geometry={getChainGeometry('R', selectedRightChainModel)}
          material={chainMaterial}
          position={[-0.000367, -0.000189, 0]}
          scale={[0.018901, 1.002097, 0.018901]}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/element007.gltf');