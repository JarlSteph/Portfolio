import React from 'react'
import modelScene from '../assets/3d/the_magic_room.glb'
import { useGLTF } from '@react-three/drei';

const Model = () => {
    const {scene, animations } =  useGLTF(modelScene);  
    return (
        <mesh position={[0, -18 , 0 ]} scale={0.2} rotation={[0, 1.7 , 0]}>
            <primitive object={scene}/>
        </mesh>
      )
    }
export default Model