import { CameraHelper } from 'three';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

const CameraDebugHelper = () => {
  const { scene, camera } = useThree();

  useEffect(() => {
    const helper = new CameraHelper(camera);
    scene.add(helper);

    // Cleanup function to remove the helper
    return () => {
      scene.remove(helper);
      helper.dispose(); // Dispose of the helper properly
    };
  }, [scene, camera]); // Dependencies

  return null;
};

export default CameraDebugHelper;
