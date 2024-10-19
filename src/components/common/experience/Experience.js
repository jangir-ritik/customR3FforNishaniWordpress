'use client'
import React, { useRef, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useControls } from 'leva'
import { OrbitControls, useHelper, PivotControls, useGLTF, useAnimations } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import Model from './Model'
import useProductStore from '@/app/store/store'
import Model007 from './Model007'


function Experience() {
  useGLTF.preload('/element007.gltf')

  const directionalLightRef = useRef();
  const selectedMetal = useProductStore(state => state.selectedMetal)
  const selectedChain = useProductStore(state => state.selectedChain)


  // const { position, color, perfVisible, showLightHelper } = useControls({
  //   position: { value: 0, min: -10, max: 10, step: 0.01 },
  //   color: '#fff',
  //   perfVisible: false,
  //   showLightHelper: true
  // });

  // useEffect(() => {
  //   const actionNames = Object.keys(actions)
  //   if (actionNames.length > 0) {
  //     actions[actionNames[0]].play()
  //     // actions[actionNames[1]].play()
  //     // actions[actionNames[2]].play()

  //   }
  // }, [actions])


  useFrame((state, delta) => {
    const { camera } = state;
    const angle = state.clock.elapsedTime;
    camera.rotation.x = Math.sin(angle) * 0.1;
    camera.rotation.z = Math.cos(angle) * 0.1;
    camera.lookAt(0, 0, 0)
  })

  // useHelper(showLightHelper && directionalLightRef, THREE.DirectionalLightHelper, 1);

  return (
    <>
      {/* {perfVisible && <Perf position="top-left" />} */}
      <OrbitControls makeDefault />
      <directionalLight
        ref={directionalLightRef}
        position={[0, 2, 3]}
        intensity={5}
        color={'#fff'}
      />
      <ambientLight intensity={3} />
      <Suspense fallback={null}>
        <Model007 metalColor={selectedMetal} selectedChain={selectedChain}  />
        {/* <Model metalColor={selectedMetal} selectedChain={selectedChain} /> */}
      </Suspense>
    </>
  )
}

export default Experience