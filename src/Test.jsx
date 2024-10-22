import React, { useRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import useProductStore from './store/store';


export default function GLTFViewer() {
  const group = useRef();
  const { nodes, materials } = useGLTF('/test.gltf');
  const { parts } = useProductStore();

  const getMaterial = (partType) => {
    const partData = parts[partType];
    const isGold = partData.plating === 'gold';
    // #9E6D33
    // #D6A87B
    // #E7C27B
    // #E5BF7F
    // #C18A4C
    // #F1CA88
    // #E5C080
    // #CE9835
    // #E3BA76
    // #FEDF9E
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
            // visible={true}
          />
        );
      })}
    </group>
  );
}

useGLTF.preload('/test.gltf');

  

