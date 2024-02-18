import React, { useEffect, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import arrowModel from '../assets/3d/direction_arrow.glb';
import arrowModel2 from '../assets/3d/direction_arrow2.glb';
import arrowModel3 from '../assets/3d/direction_arrow3.glb';
import { useGLTF } from '@react-three/drei';

const Arrow = ({ positionArr, color, rotation, nr }) => {
  let modelPath;

  // Set the modelPath based on the nr prop
  if (nr === 1) {
    modelPath = arrowModel;
  } else if (nr === 2) {
    modelPath = arrowModel2;
  } else if (nr === 3) {
    modelPath = arrowModel3;
  } else {
    // Default to arrowModel if nr is not 1, 2, or 3
    modelPath = arrowModel;
  }

  const { scene } = useGLTF(modelPath);
  const meshRef = useRef();

  useEffect(() => {
    // Traverse through the children of the loaded scene and change material color
    scene.traverse((child) => {
      if (child.isMesh) {
        const opacityArrow = 0.5;
        child.material.color.set(color);
        child.material.opacity = opacityArrow;
        child.material.transparent = opacityArrow < 1; // Enable transparency if opacity is less than 1
      }
    });
  }, [scene, color]);

  // Animation logic using useFrame
  useFrame((state, delta) => {
    if (nr !== 2) {
      meshRef.current.position.y = positionArr[1] + Math.sin(state.clock.elapsedTime * 2) * 0.7; // Adjust amplitude and speed
    }
    else {
      meshRef.current.position.z = positionArr[2] + Math.sin(state.clock.elapsedTime * 2) * 0.7; // Adjust amplitude and speed
    }
    // Update the position to move up and down and consider the provided positionArr prop
  });

  return (
    <mesh ref={meshRef} position={positionArr} scale={1} rotation={rotation}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Arrow;
