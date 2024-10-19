import React, { useRef, useEffect, useMemo } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

export default function Model(props) {
  const { metalColor, selectedChain } = props
  const groupRef = useRef()
  const { nodes, materials } = useGLTF('/Elements3.gltf')
  const { actions } = useAnimations(useGLTF('/Elements3.gltf').animations, groupRef)

  const memoizedMaterials = useMemo(() => {
    const newMaterials = {
      Blue: materials.Blue.clone(),
      red: materials.red.clone(),
      yellow: materials.yellow.clone()
    }

    if (metalColor === 'gold') {
      newMaterials.Blue.color = new THREE.Color('#ffd700')
      newMaterials.red.color = new THREE.Color('#ffd700')
      newMaterials.yellow.color = new THREE.Color('#ffd700')
    } else if (metalColor === 'silver') {
      newMaterials.red.color = new THREE.Color('#c0c0c0')
      newMaterials.yellow.color = new THREE.Color('#c0c0c0')
      newMaterials.Blue.color = new THREE.Color('#c0c0c0')
    }

    return newMaterials
  }, [materials, metalColor])

  useEffect(() => {
    const actionNames = Object.keys(actions)
    actionNames.forEach(name => {
      actions[name].play()
    })
  }, [actions])

  return (
    <group ref={groupRef} {...props} dispose={null}>
      {selectedChain === 'Left Chain' && (
      <mesh
        // castShadow
        // receiveShadow
        geometry={nodes.Cube.geometry}
        material={memoizedMaterials.Blue}
        position={nodes.Cube.position}
        rotation={nodes.Cube.rotation}
        scale={nodes.Cube.scale}
        />
      )}
      <mesh
        // castShadow
        // receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={memoizedMaterials.red}
        position={nodes.Cylinder.position}
        rotation={nodes.Cylinder.rotation}
        scale={nodes.Cylinder.scale}
      />
      <mesh
        // castShadow
        // receiveShadow
        geometry={nodes.Cone.geometry}
        material={memoizedMaterials.yellow}
        position={nodes.Cone.position}
        rotation={nodes.Cone.rotation}
        scale={nodes.Cone.scale}
      />
    </group>
  )
}

useGLTF.preload('/Elements3.gltf')