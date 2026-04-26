import React, { useEffect, useRef, useMemo } from 'react';
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
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const meshRef = useRef();

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        const opacityArrow = 0.5;
        child.material.color.set(color);
        child.material.opacity = opacityArrow;
        child.material.transparent = opacityArrow < 1;
      }
    });
  }, [clonedScene, color]);

  // Animation logic using useFrame
  useFrame((state) => {
    if (nr === 2) {
      meshRef.current.position.z = positionArr[2] + Math.sin(state.clock.elapsedTime * 2) * 0.7;
    } else {
      meshRef.current.position.y = positionArr[1] + Math.sin(state.clock.elapsedTime * 2) * 0.7;
    }
  });

  return (
    <mesh ref={meshRef} position={positionArr} scale={0.6} rotation={rotation}>
      <primitive object={clonedScene} />
    </mesh>
  );
};

export default Arrow;
