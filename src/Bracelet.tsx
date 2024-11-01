import React, { useRef, useMemo, Suspense } from 'react';
import { useEnvironment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import useProductStore from './store/store';
import Loader from './components/Loader';
import { MeshRefractionMaterial } from '@react-three/drei';

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
    const env = useEnvironment({ 
      files: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr' 
    });
    
    switch(materialType) {
      case 'diamond':
        return new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(0xffffff),
          metalness: 0.0,
          roughness: 0.0,
          transmission: 0.99, // High transmission for transparency
          thickness: 0.5,    // Controls internal refraction
          envMap: env,       // Important for reflections
          envMapIntensity: 5.0,
          clearcoat: 1.0,
          clearcoatRoughness: 0.0,
          ior: 2.42,        // Diamond's index of refraction
          attenuationColor: new THREE.Color(0xffffff),
          attenuationDistance: 0.1,
          specularIntensity: 1.0,
          specularColor: new THREE.Color(0xffffff),
          transparent: true,
          side: THREE.DoubleSide
        });

case 'pearl': {
  // Base color with slight pink/cream tint
  const baseColor = new THREE.Color(0xfff5ee);
  // Iridescent color with subtle rainbow effect
  const iridescenceColor = new THREE.Color(0xe8f0ff);
  // Sheen color with slight blue/green tint for depth
  const sheenBaseColor = new THREE.Color(0xf0f8ff);
  
  return new THREE.MeshPhysicalMaterial({
    // Base material properties
    color: baseColor,
    metalness: 0.15,      // Slightly increased for more reflectivity
    roughness: 0.2,       // Decreased for more shine
    
    // Enhanced reflection and coating
    envMapIntensity: 2.0, // Increased environment map influence
    clearcoat: 1.0,       // Maximum clearcoat for glossy finish
    clearcoatRoughness: 0.1,
    reflectivity: 1.0,    // Maximum reflectivity
    
    // Iridescence settings
    iridescence: 0.9,     // Strong but not overwhelming
    iridescenceIOR: 2.2,  // Higher IOR for more pronounced color shift
    iridescenceThicknessRange: [100, 400], // Wider range for more variety
    
    // Sheen for pearly luster
    sheen: 1.0,           // Maximum sheen
    sheenRoughness: 0.2,  // Reduced roughness for smoother appearance
    sheenColor: sheenBaseColor,
    
    // Transmission and thickness
    transmission: 0.1,    // Slight translucency
    thickness: 0.5,       // Moderate thickness for internal effects
    
    // Additional properties
    attenuationDistance: 0.3,
    attenuationColor: new THREE.Color(0xfaf0e6),
    ior: 1.8,            // Higher IOR for more realistic light interaction
    
    // Ensure both sides are rendered
    side: THREE.DoubleSide,
    
    // Enable all relevant features
    transparent: true,
    
    // Optional emission for subtle glow
    emissive: new THREE.Color(0xffffff),
    emissiveIntensity: 0.05
  });
}

      default:
        const isGold = partData.plating === 'gold';
        // const baseColor = isGold ? 0xE6Bf80 : 0xd4d4d1;
        const baseColor = isGold ? 0xE6Bf80 : 0xd4d4d1;
        const metalness = isGold ? 1.0 : 0.99; // Slightly lower metalness
        const roughness = isGold ? 0.1 : 0.03; // Slightly higher roughness
        return new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(baseColor),
          metalness: metalness,
          roughness: roughness,
          // envMapIntensity: envMapIntensity,
    //       anisotropy: 0.1,                   
        // anisotropyRotation: Math.PI / 2,
          // clearcoat: 0.5,
          // clearcoatRoughness: 0.1,
          // reflectivity: 1.0,
          // emissive: new THREE.Color('#FED93D'),
          // emissiveIntensity: 0.2,
          // ior: 2.4,
          // emissive: isGold ? new THREE.Color(0xF0C883).multiplyScalar(0.05) : new THREE.Color(0xCFD0CA).multiplyScalar(0.1),
          // emissiveIntensity: 0.15
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
