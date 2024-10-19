'use client'

import { Canvas } from '@react-three/fiber'
import React from 'react'
import { useGLTF } from '@react-three/drei'

function ExperienceWrapper({ children }) {
    useGLTF.preload('/element007.gltf')
    const cameraSettings = {
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 0, 10]
    }

    return (
        <Canvas camera={cameraSettings} id="experience-canvas">
            {children}
        </Canvas>
    )
}

export default ExperienceWrapper