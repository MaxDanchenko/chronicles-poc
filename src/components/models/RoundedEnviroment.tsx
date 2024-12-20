import { useLoader } from '@react-three/fiber';
import { TextureLoader, BackSide } from 'three';

const RoundedEnvironment = ({ texturePath = '/textures/subhome-ai.jpg', radius = 50 }) => {
  // Load the texture for the sphere
  const texture = useLoader(TextureLoader, texturePath);

  return (
    <mesh>
      <sphereGeometry args={[radius, 64, 64]} /> {/* Sphere with smooth segments */}
      <meshStandardMaterial map={texture} side={BackSide} /> {/* Render inside of the sphere */}
    </mesh>
  );
};

export default RoundedEnvironment;
