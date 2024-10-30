import React, { useRef, useMemo, Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import useProductStore from './store/store';
import Loader from './components/Loader';

export default function Necklace() {
  return (
    <Suspense fallback={<Loader />}>
      <NecklaceContent />
    </Suspense>
  );
}

function NecklaceContent() {
  const group = useRef();
  const { nodes } = useGLTF('/NecklaceFile.gltf');
  const { parts } = useProductStore();

  const getMaterial = (partType, materialType) => {
    const partData = parts[partType];
    
    switch(materialType) {
      case 'diamond':
        return new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(0xffffff),
          metalness: 0.1,
          roughness: 0.02,
          transmission: 0.95,
          thickness: 0.5,
          envMapIntensity: 2.0,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          ior: 2.4,
          transparent: true,
          opacity: 0.9
        });

      case 'pearl':
        return new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(0xfffaf0),
          metalness: 0.1,
          roughness: 0.3,
          envMapIntensity: 1.0,
          clearcoat: 0.8,
          clearcoatRoughness: 0.1,
          iridescence: 1.0,
          iridescenceIOR: 1.5,
          sheen: 1.0,
          sheenRoughness: 0.3,
          sheenColor: new THREE.Color(0xffffff)
        });

      default:
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
    }
  };

  const getVisibility = (partType, modelIndex) => {
    return parts[partType].selectedModel === modelIndex;
  };

  // Organized meshes by partType with material specification
  const meshes = useMemo(() => [
    // Left Chain
    { name: 'NecklaceL1', partType: 'leftChain', modelIndex: 0, material: 'metal' },
    { name: 'NecklaceL2', partType: 'leftChain', modelIndex: 1, material: 'metal' },
    { name: 'NecklaceL2Pearls', partType: 'leftChain', modelIndex: 1, material: 'pearl' },
    { name: 'NecklaceL3', partType: 'leftChain', modelIndex: 2, material: 'metal' },
    { name: 'NecklaceL4', partType: 'leftChain', modelIndex: 3, material: 'metal' },
    { name: 'NecklaceL5', partType: 'leftChain', modelIndex: 4, material: 'metal' },
    { name: 'NecklaceL6', partType: 'leftChain', modelIndex: 5, material: 'metal' },
    { name: 'NecklaceL6Daimonds', partType: 'leftChain', modelIndex: 5, material: 'diamond' },
    // Top Lock
    { name: 'TopHook1', partType: 'topLock', modelIndex: 0, material: 'metal' },
    { name: 'TopHook2', partType: 'topLock', modelIndex: 1, material: 'metal' },
    { name: 'TopHook3', partType: 'topLock', modelIndex: 2, material: 'metal' },
    { name: 'TopHook4Base', partType: 'topLock', modelIndex: 3, material: 'metal' },
    { name: 'TopHook4Daimonds', partType: 'topLock', modelIndex: 3, material: 'diamond' },
    { name: 'TopHook5', partType: 'topLock', modelIndex: 4, material: 'metal' },
    { name: 'TopHook1', partType: 'topLock', modelIndex: 5, material: 'metal' },
    // Bottom Lock
    { name: 'BottomHook1', partType: 'bottomLock', modelIndex: 0, material: 'metal' },
    { name: 'BottomHook2', partType: 'bottomLock', modelIndex: 1, material: 'metal' },
    { name: 'BottomHook3', partType: 'bottomLock', modelIndex: 2, material: 'metal' },
    { name: 'BottomHook4Base', partType: 'bottomLock', modelIndex: 3, material: 'metal' },
    { name: 'BottomHook4Daimonds', partType: 'bottomLock', modelIndex: 3, material: 'diamond' },
    { name: 'BottomHook5', partType: 'bottomLock', modelIndex: 4, material: 'metal' },
    { name: 'BottomHook1', partType: 'bottomLock', modelIndex: 5, material: 'metal' },
    // Right Chain
    { name: 'NecklaceR1', partType: 'rightChain', modelIndex: 0, material: 'metal' },
    { name: 'NecklaceR2', partType: 'rightChain', modelIndex: 1, material: 'metal' },
    { name: 'NecklaceR2Pearls', partType: 'rightChain', modelIndex: 1, material: 'metal' },
    { name: 'NecklaceR3', partType: 'rightChain', modelIndex: 2, material: 'metal' },
    { name: 'NecklaceR4', partType: 'rightChain', modelIndex: 3, material: 'metal' },
    { name: 'NecklaceR5', partType: 'rightChain', modelIndex: 4, material: 'metal' },
    { name: 'NecklaceR6', partType: 'rightChain', modelIndex: 5, material: 'metal' },
    // Necklace A
    { name: 'NecklaceA1', partType: 'additionalChain', modelIndex: 0, material: 'metal' },
    { name: 'NecklaceA2Base', partType: 'additionalChain', modelIndex: 1, material: 'metal' }, // typo in 
    { name: 'NecklaceA2Perls', partType: 'additionalChain', modelIndex: 1, material: 'metal' }, // typo in 
    { name: 'NecklaceA3', partType: 'additionalChain', modelIndex: 2, material: 'metal' },
    { name: 'NecklaceA4', partType: 'additionalChain', modelIndex: 3, material: 'metal' },
    { name: 'NecklaceA5', partType: 'additionalChain', modelIndex: 4, material: 'metal' },
    { name: 'NecklaceA6Base', partType: 'additionalChain', modelIndex: 5, material: 'metal' },
    { name: 'NecklaceA6Daimonds', partType: 'additionalChain', modelIndex: 5, material: 'diamond' },
  ], []);

  return (
    <group ref={group} dispose={null}>
      {meshes.map((mesh) => {
        const node = nodes[mesh.name];
        if (!node) return null;
        return (
          <mesh
            key={mesh.name + mesh.modelIndex}
            geometry={node.geometry}
            material={getMaterial(mesh.partType, mesh.material)}
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

useGLTF.preload('/NecklaceFile.gltf');
