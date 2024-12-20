import { useGLTF } from "@react-three/drei";

const RockyGround = ({ position = [0,0,0], rotation= [0,0,0], scale = [3, 3, 3] }: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}): JSX.Element => {
  const { scene } = useGLTF("/assets/rocky_ground.glb");

  return <primitive object={scene} scale={scale} position={position} rotation={rotation} />;
};


export default RockyGround;
