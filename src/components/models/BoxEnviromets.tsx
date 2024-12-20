import { useLoader } from '@react-three/fiber';
import { TextureLoader, BackSide, RepeatWrapping } from 'three';

const BoxEnvironment = ({ texturePath = '/textures/boxTexture.jpg', size = 50 }) => {
  // Load the texture for the sides
  const texture = useLoader(TextureLoader, texturePath);

  // Adjust texture position and transformations
  texture.wrapS = RepeatWrapping; // Allow the texture to repeat horizontally
  texture.wrapT = RepeatWrapping; // Allow the texture to repeat vertically
  texture.offset.set(0, 0.7);   // Move the texture position (X: right, Y: up)
  texture.repeat.set(1, 1);       // Repeat the texture if needed (scale)

  return (
    <mesh>
      <boxGeometry args={[size, size, size]} /> {/* Box dimensions */}
      <meshStandardMaterial map={texture} side={BackSide} /> {/* Apply texture to inside */}
    </mesh>
  );
};

export default BoxEnvironment;
