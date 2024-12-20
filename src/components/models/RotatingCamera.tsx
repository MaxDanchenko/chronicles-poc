import { useFrame } from '@react-three/fiber';

const RotatingCamera = ({ radius = 10, lookAt = [0, 1, 0], speed = 0.1 }) => {

  useFrame(({ clock, camera }) => {
    // Update camera position in a circular orbit
    const time = clock.elapsedTime * speed;
    camera.position.x = Math.sin(time) * radius;
    camera.position.z = Math.cos(time) * radius;

    // Look at the target point
    camera.lookAt(lookAt[0], lookAt[1], lookAt[2])
  });

  return null
};

export default RotatingCamera;
