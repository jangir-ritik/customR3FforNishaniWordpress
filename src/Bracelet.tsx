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
  const textureLoader = new THREE.TextureLoader();
  const { nodes } = useGLTF('/BraceletFile.gltf');
  const { parts } = useProductStore();
  const leftChain2NormalMap = textureLoader.load('/BraceletR2_Normal.png');
  const leftChain3NormalMap = textureLoader.load('/BraceletR3_Normal.png');
  const rightChain2NormalMap = textureLoader.load('/BraceletR2_Normal.png');
  const rightChain3NormalMap = textureLoader.load('/BraceletR3_Normal.png');
  const additionalChain2NormalMap = textureLoader.load('/BraceletA2_Normal.png');
  const additionalChain3NormalMap = textureLoader.load('/BraceletA3_Normal.png');
  const bottomLockNormalMap = textureLoader.load('/Bracelet_BottomHook3_Normal.png');
  const topLockNormalMap = textureLoader.load('/Bracelet_BottomHook3_Normal.png');

  const getMaterial = (partType, materialType, finish, meshName) => {
    const partData = parts[partType];
    const env = useEnvironment({
      files: '/env-gem-4.exr'
    });

    const getNormalMap = (meshName) => {
      switch (meshName) {
        case 'BraceletL2': return leftChain2NormalMap;
        case 'BraceletL3': return leftChain3NormalMap;
        case 'BraceletR2': return rightChain2NormalMap;
        case 'BraceletR3': return rightChain3NormalMap;
        case 'BraceletA2': return additionalChain2NormalMap;
        case 'BraceletA3': return additionalChain3NormalMap;
        case 'BottomHook3': return bottomLockNormalMap;
        case 'TopHook3': return topLockNormalMap;
        default: return null;
      }
    };

    const normalMap = getNormalMap(meshName);
    const baseMatOptions = {
      normalMap,
      ...(normalMap && { normalScale: new THREE.Vector2(1, 1) }),
      // normalStrength: 2.5,
    };

    switch (materialType) {
      case 'diamond':
        return new THREE.MeshPhysicalMaterial({
          ...baseMatOptions,
          color: new THREE.Color(0xffffff),
          metalness: 0.0,
          roughness: 0.0,
          transmission: 0.8, // High transmission for transparency
          thickness: 2,    // Controls internal refraction
          envMap: env,       // Important for reflections
          envMapIntensity: 1.5,
          clearcoat: 1.0,
          clearcoatRoughness: 0.0,
          ior: 2.42,        // Diamond's index of refraction
          attenuationColor: new THREE.Color(0xffffff),
          attenuationDistance: 0.2,
          specularIntensity: 1.5,
          specularColor: new THREE.Color(0xffffff),
          transparent: true,
          side: THREE.DoubleSide,
          sheen: 1.0,                         // Added sheen for extra sparkle
          sheenRoughness: 0.0,                // Smooth sheen
          sheenColor: new THREE.Color(0xffffff), // White sheen
        });

      case 'pearl': {
        // Base color with slight pink/cream tint
        const baseColor = new THREE.Color(0xfff5ee);
        // Iridescent color with subtle rainbow effect
        const iridescenceColor = new THREE.Color(0xe8f0ff);
        // Sheen color with slight blue/green tint for depth
        const sheenBaseColor = new THREE.Color(0xf0f8ff);

        return new THREE.MeshPhysicalMaterial({
          ...baseMatOptions,
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
          emissiveIntensity: 0.05,
        });
      }

      default:
        const isGold = partData.plating === 'gold';
        const isMatte = finish === 'matte';

        const baseColor = isGold ? 0xFED88B : 0xd4d4d1;
        const metalness = isGold ? 1.0 : 1.0; // Slightly lower metalness
        const roughness = isGold ? 0.1 : 0.15; // Slightly higher roughness

        if (isMatte) {
          return new THREE.MeshPhysicalMaterial({
            ...baseMatOptions,
            color: isGold ? new THREE.Color(0xFED88B).multiplyScalar(0.8) : new THREE.Color(0xD0D1CC),
            metalness: 0.8,         // Increased slightly for better metallic look
            roughness: 0.6,         // Increased for more pronounced matte effect
            envMap: env,
            envMapIntensity: 1.3,   // Reduced for more subtle reflections
            clearcoat: 0.1,         // Slight clearcoat for subtle shine
            clearcoatRoughness: 0.8, // High roughness for matte clearcoat
            reflectivity: 0.7,      // Moderate reflectivity
            side: THREE.DoubleSide,
            flatShading: true,      // Emphasizes the matte surface
            normalScale: new THREE.Vector2(0.5, 0.5), // Subtle surface detail
          });
        }
        return new THREE.MeshPhysicalMaterial({
          ...baseMatOptions,
          color: new THREE.Color(baseColor),
          metalness: metalness,
          roughness: roughness,
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
    { name: 'TopHook1', partType: 'topLock', modelIndex: 5, material: 'metal', finish: 'matte' },
    // Bottom Lock
    { name: 'BottomHook1', partType: 'bottomLock', modelIndex: 0, material: 'metal' },
    { name: 'BottomHook2', partType: 'bottomLock', modelIndex: 1, material: 'metal' },
    { name: 'BottomHook3', partType: 'bottomLock', modelIndex: 2, material: 'metal' },
    { name: 'BottomHook4Base', partType: 'bottomLock', modelIndex: 3, material: 'metal' },
    { name: 'BottomHook4Daimonds', partType: 'bottomLock', modelIndex: 3, material: 'diamond' },
    { name: 'BottomHook5', partType: 'bottomLock', modelIndex: 4, material: 'metal' },
    { name: 'BottomHook1', partType: 'bottomLock', modelIndex: 5, material: 'metal', finish: 'matte' },
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
            material={getMaterial(mesh.partType, mesh.material, mesh.finish, mesh.name)}
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
