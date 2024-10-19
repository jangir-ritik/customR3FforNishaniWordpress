import React, { useRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import useProductStore from './store/store';


export default function GLTFViewer() {
  const group = useRef();
  const { nodes, materials } = useGLTF('/test.gltf');
  const { parts } = useProductStore();

  // const getMaterial = (partType) => {
  //   const partData = parts[partType];
  //   const isGold = partData.metal === 'gold';
  
  //   const baseColor = isGold ? 0xffd700 : 0xffffff;
  //   const metalness = 0.9;
  //   const roughness = 0.1;
  
  //   return new THREE.MeshPhysicalMaterial({
  //     color: new THREE.Color(baseColor),
  //     metalness: metalness,
  //     roughness: roughness,
  //     envMapIntensity: 1.5,
  //     clearcoat: 0.5,
  //     clearcoatRoughness: 0.1,
  //     reflectivity: 1.0,
  //     emissive: isGold ? new THREE.Color(0x332200).multiplyScalar(0.2) : new THREE.Color(0x111111).multiplyScalar(0.1),
  //   });
  // };

  const getMaterial = (partType) => {
    const partData = parts[partType];
    const isGold = partData.metal === 'gold';
  
    // Refined color values
    const baseColor = isGold ? 0xFFD700 : 0xE6E6E6;
    const metalness = isGold ? 0.8 : 0.9;
    const roughness = isGold ? 0.15 : 0.1;
  
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(baseColor),
      metalness: metalness,
      roughness: roughness,
      envMapIntensity: 1.2, // Increased for more reflection
      clearcoat: 0.3, // Increased for more shine
      clearcoatRoughness: 0.3,
      reflectivity: 0.9,
      // Subtle noise for realism
      // roughnessMap: createNoiseTexture(0.05),
      // normalMap: createNoiseTexture(0.03),
      // normalScale: new THREE.Vector2(0.05, 0.05),
      // Add slight color variation
      emissive: isGold ? new THREE.Color(0x332200).multiplyScalar(0.1) : new THREE.Color(0x111111).multiplyScalar(0.05),
    });
  };
  
  // Helper function to create noise texture (if not already defined)
  function createNoiseTexture(intensity = 0.05) {
    const size = 256;
    const data = new Uint8Array(size * size * 4);
    for (let i = 0; i < size * size * 4; i += 4) {
      const noise = Math.random() * intensity * 255;
      data[i] = data[i + 1] = data[i + 2] = 128 + noise;
      data[i + 3] = 255; // Alpha
    }
    const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    texture.needsUpdate = true;
    return texture;
  }


  const getVisibility = (partType, modelIndex) => {
    return parts[partType].selectedModel === modelIndex;
  };

  const meshes = useMemo(() => [
    // Left side meshes
    { name: 'Med_L2', partType: 'leftChain', modelIndex: 0 },
    { name: 'Med_L1', partType: 'leftChain', modelIndex: 1 },
    { name: 'Med_L5', partType: 'leftChain', modelIndex: 2 },
    { name: 'Med_L3', partType: 'leftChain', modelIndex: 3 },
    { name: 'Med_L6', partType: 'leftChain', modelIndex: 4 },
    { name: 'Med_L4', partType: 'leftChain', modelIndex: 5 },
    // Right side meshes
    { name: 'Med_R2', partType: 'rightChain', modelIndex: 0 },
    { name: 'Med_R1', partType: 'rightChain', modelIndex: 1 },
    { name: 'Med_R5', partType: 'rightChain', modelIndex: 2 },
    { name: 'Med_R3', partType: 'rightChain', modelIndex: 3 },
    { name: 'Med_R6', partType: 'rightChain', modelIndex: 4 },
    { name: 'Med_R4', partType: 'rightChain', modelIndex: 5 },
    // Top meshes
    { name: 'lock03_Top', partType: 'topLock', modelIndex: 0 },
    { name: 'lock04_Top', partType: 'topLock', modelIndex: 1 },
    { name: 'lock02_Top', partType: 'topLock', modelIndex: 2 },
    { name: 'lock01_Top', partType: 'topLock', modelIndex: 3 },
    { name: 'lock_05_Top', partType: 'topLock', modelIndex: 4 },
    // Bottom meshes
    { name: 'lock03_Bot', partType: 'bottomLock', modelIndex: 0 },
    { name: 'lock04_Bot', partType: 'bottomLock', modelIndex: 1 },
    { name: 'lock02_Bot', partType: 'bottomLock', modelIndex: 2 },
    { name: 'lock01_Bot', partType: 'bottomLock', modelIndex: 3 },
    { name: 'lock_05_Bot', partType: 'bottomLock', modelIndex: 4 },
  ], []);
  
  return (
    <group ref={group} dispose={null}>
      {meshes.map((mesh) => {
        const node = nodes[mesh.name];
        if (!node) return null;
        
        return (
          <mesh
            key={`${mesh.name}-${mesh.partType}-${mesh.modelIndex}`}
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

useGLTF.preload('/test.gltf');

  

