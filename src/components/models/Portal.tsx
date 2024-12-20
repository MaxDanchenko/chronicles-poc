import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

const Portal = ({
                  position = [0, 0, 0],
                  rotation = [0, 0, 0],
                  scale = [3, 3, 3],
                }: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}): JSX.Element => {
  const { scene } = useGLTF("/assets/portal.glb");

  useEffect(() => {
    // Traverse the scene graph to enable shadow receiving for all meshes
    scene.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        (node as THREE.Mesh).receiveShadow = true; // Ensure the mesh can receive shadows
      }
    });
  }, [scene]);

  return (
    <primitive
      object={scene}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
};

export default Portal;
