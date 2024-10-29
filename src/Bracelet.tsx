import React, { useRef, useMemo, Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import useProductStore from './store/store';
import Loader from './components/Loader';

export default function Bracelet() {
  return (
    <Suspense fallback={<Loader />}>
      <BraceletContent />
    </Suspense>
  );
}

function BraceletContent() {
  const group = useRef();
  const { nodes } = useGLTF('/BraceletFile.gltf');
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
        // const baseColor = isGold ? 0xE6Bf80 : 0xd4d4d1;
        const baseColor = isGold ? 0xFDB35D : 0xCFD0CA;
        // const baseColor = isGold ? 0xFED93D : 0xE8E8E8;
        const metalness = isGold ? 0.95 : 0.99; // Slightly lower metalness
        const roughness = isGold ? 0.05 : 0.003; // Slightly higher roughness
        const envMapIntensity = 2.0; // Increase from 1.5
        return new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(baseColor),
          metalness: metalness,
          roughness: roughness,
          envMapIntensity: envMapIntensity,
    //       anisotropy: 0.1,                   
        // anisotropyRotation: Math.PI / 2,
          // clearcoat: 0.5,
          // clearcoatRoughness: 0.1,
          // reflectivity: 1.0,
          emissive: isGold ? new THREE.Color(0xFED93D).multiplyScalar(0.6) : new THREE.Color(0xFFFFFF).multiplyScalar(0.1),
          emissiveIntensity: 0.15
        });
    }
  };

  const getVisibility = (partType, modelIndex) => {
    return parts[partType].selectedModel === modelIndex;
  };

  // Organized meshes by partType with material specification
  const meshes = useMemo(() => [
    // Left Chain
    { name: 'BraceletL1', partType: 'leftChain', modelIndex: 0, material: 'metal' },
    { name: 'BraceletL2', partType: 'leftChain', modelIndex: 1, material: 'metal' },
    { name: 'BraceletL3', partType: 'leftChain', modelIndex: 2, material: 'metal' },
    { name: 'BraceletL4', partType: 'leftChain', modelIndex: 3, material: 'metal' },
    { name: 'BraceletL5', partType: 'leftChain', modelIndex: 4, material: 'metal' },
    { name: 'BraceletL5', partType: 'leftChain', modelIndex: 4, material: 'metal' },
    { name: 'BraceletL6', partType: 'leftChain', modelIndex: 5, material: 'metal' },
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
    { name: 'BraceletR1', partType: 'rightChain', modelIndex: 0, material: 'metal' },
    { name: 'BraceletR2', partType: 'rightChain', modelIndex: 1, material: 'metal' },
    { name: 'BraceletR3', partType: 'rightChain', modelIndex: 2, material: 'metal' },
    { name: 'BraceletR4', partType: 'rightChain', modelIndex: 3, material: 'metal' },
    { name: 'BraceletR5', partType: 'rightChain', modelIndex: 4, material: 'metal' },
    { name: 'BraceletR6', partType: 'rightChain', modelIndex: 5, material: 'metal' },
    // Bracelet A
    { name: 'BraceletA1', partType: 'additionalChain', modelIndex: 0, material: 'metal' },
    { name: 'BraceletA2', partType: 'additionalChain', modelIndex: 1, material: 'metal' },
    { name: 'BraceletA3', partType: 'additionalChain', modelIndex: 2, material: 'metal' },
    { name: 'BraceletA4', partType: 'additionalChain', modelIndex: 3, material: 'metal' },
    { name: 'BraceletA5', partType: 'additionalChain', modelIndex: 4, material: 'metal' },
    { name: 'BraceletA6', partType: 'additionalChain', modelIndex: 5, material: 'metal' },
    
  ], []);

  return (
    <group ref={group} dispose={null}>
      {meshes.map((mesh) => {
        const node = nodes[mesh.name];
        if (!node) return null;
        return (
          <mesh
            castShadow
            receiveShadow
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

useGLTF.preload('/BraceletFile.gltf');
