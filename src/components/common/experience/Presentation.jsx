import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import useProductStore from '@/app/store/store';

export default function Presentation() {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/Presentation.gltf');
  const { actions, names } = useAnimations(animations, group);
  const { chainParts } = useProductStore();

  useEffect(() => {
    names.forEach(name => {
      if (actions[name]) {
        actions[name].reset().setDuration(800).play();
      }
    });
    return () => {
      Object.values(actions).forEach(action => action.stop());
    };
  }, [actions, names]);

  const getMaterial = (materialName, part) => {
    const baseMaterial = materials[materialName];
    const partState = chainParts[part];
    return new THREE.MeshStandardMaterial({
      ...baseMaterial,
      color: partState.metal === 'gold' ? new THREE.Color(0xffd700) : new THREE.Color(0xc0c0c0),
      metalness: 0.85,
      roughness: 0.3,
    });
  };

  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <mesh
          name="R1"
          geometry={nodes.R1.geometry}
          material={getMaterial('Silver', 'R1')}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          name="Hooktop"
          geometry={nodes.Hooktop.geometry}
          material={getMaterial('Silver', 'Hooktop')}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.749365, 0.749365, 0.749365]}
        />
        <mesh
          name="L1"
          geometry={nodes.L1.geometry}
          material={getMaterial('Gold', 'L1')}
          rotation={[0, Math.PI / 2, -Math.PI / 2]}
        />
        <mesh
          name="HookBotm"
          geometry={nodes.HookBotm.geometry}
          material={getMaterial('Gold', 'HookBotm')}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.749365, 0.749365, 0.749365]}
          position={[0, 0, -3.814697265625e-6]}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/Presentation.gltf');