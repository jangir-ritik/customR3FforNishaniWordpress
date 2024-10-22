import React, { useRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import useProductStore from './store/store';

export default function Bracelet() {
  const group = useRef();
  const { nodes } = useGLTF('/BraceletFile.gltf'); // Load the new model
  const { parts } = useProductStore();

  const getMaterial = (partType) => {
    const partData = parts[partType];
    const isGold = partData.plating === 'gold';
    const baseColor = isGold ? 0xEBB864 : 0xE8E8E8;
    const metalness = isGold ? 1.3 : 0.95;
    const roughness = isGold ? 0.1 : 0.05;

    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(baseColor),
      metalness: metalness,
      roughness: roughness,
      envMapIntensity: 1.5,
      clearcoat: 0.1,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
      emissive: isGold ? new THREE.Color(0xFFD700).multiplyScalar(0.05) : new THREE.Color(0x111111).multiplyScalar(0.1),
    });
  };

  const getVisibility = (partType, modelIndex) => {
    return parts[partType].selectedModel === modelIndex;
  };

  const meshes = useMemo(() => [
    { name: 'BraceletL3', partType: 'leftChain', modelIndex: 2 },
    { name: 'BraceletL6', partType: 'leftChain', modelIndex: 5 },
    { name: 'BraceletL2', partType: 'leftChain', modelIndex: 1 },
    { name: 'BraceletL4', partType: 'leftChain', modelIndex: 3 },
    { name: 'BraceletL5Pearls', partType: 'leftChain', modelIndex: 4 },
    { name: 'BraceletL5Base', partType: 'leftChain', modelIndex: 4 },
    { name: 'BraceletL1', partType: 'leftChain', modelIndex: 0 },
    // { name: 'TopHook4Base', partType: 'topHook', modelIndex: 7 },
    // { name: 'TopHook4Daimonds', partType: 'topHook', modelIndex: 8 },
    // { name: 'TopHook5', partType: 'topLock', modelIndex: 9 },
    // { name: 'TopHook1', partType: 'topLock', modelIndex: 10 },
    // { name: 'TopHook3', partType: 'topLock', modelIndex: 11 },
    // { name: 'TopHook2', partType: 'topLock', modelIndex: 12 },
    // { name: 'BottomHook4Base', partType: 'bottomHook', modelIndex: 13 },
    // { name: 'BottomHook4Daimonds', partType: 'bottomHook', modelIndex: 14 },
    // { name: 'BottomHook5', partType: 'bottomLock', modelIndex: 15 },
    // { name: 'BottomHook1', partType: 'bottomLock', modelIndex: 16 },
    // { name: 'BottomHook3', partType: 'bottomLock', modelIndex: 17 },
    // { name: 'BottomHook2', partType: 'bottomLock', modelIndex: 18 },
    // { name: 'BraceletR3', partType: 'rightChain', modelIndex: 19 },
    // { name: 'BraceletR6', partType: 'rightChain', modelIndex: 20 },
    // { name: 'BraceletR2', partType: 'rightChain', modelIndex: 21 },
    // { name: 'BraceletR4', partType: 'rightChain', modelIndex: 22 },
    // { name: 'BraceletR5Pearls', partType: 'rightChain', modelIndex: 23 },
    // { name: 'BraceletR5Base', partType: 'rightChain', modelIndex: 24 }
  ], []);

  return (
    <group ref={group} dispose={null}>
      {/* Render each node in the model */}
      {meshes.map((mesh) => {
        const node = nodes[mesh.name];
        if (!node) return null;

        return (
          <mesh
            key={mesh.name}
            geometry={node.geometry}
            material={getMaterial(mesh.partType)}
            position={node.position}
            rotation={node.rotation}
            scale={node.scale}
            visible={getVisibility(mesh.partType, mesh.modelIndex)}
          />
        );
      })}
    </group>
  );
}

useGLTF.preload('/BraceletFile.gltf'); // Preload the new model
