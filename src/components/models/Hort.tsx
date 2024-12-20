import { useAnimations, useGLTF } from '@react-three/drei';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import useSound from 'use-sound';

type Props = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  modelLink: string;
  playAnimation?: boolean;
  listenStory?: boolean;
  onChoose?: () => void;
  handleCaption?: () => void;
};

const Hort = ({
                position = [0, 0, 0],
                rotation = [0, 0, 0],
                scale = [1, 1, 1],
                modelLink,
                playAnimation = false,
                onChoose,
                listenStory,
                handleCaption = () => {
                },
              }: Props) => {
  const { scene, animations } = useGLTF(modelLink) as unknown as {
    scene: THREE.Group;
    animations: THREE.AnimationClip[];
  };
  const { actions } = useAnimations(animations, scene);
  const isPlayingRef = useRef<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);
  const [play] = useSound('/audio/hort_audio.mp3');

  const handleAudioPlay = useCallback(() => {
    if (onChoose) {
      onChoose();
      return;
    }

    if (isPlayingRef.current) return;

    isPlayingRef.current = true;
    play();
    handleCaption();
    setTimeout(() => {
      isPlayingRef.current = false;
    }, 31000);
  }, [handleCaption, onChoose, play]);

  useEffect(() => {
    if (listenStory) {
      handleAudioPlay();
    }

    if (animations.length >= 2) {
      const action0 = actions?.[animations[0]?.name];
      const action1 = actions?.[animations[1]?.name];

      if (playAnimation && action0 && action1) {
        action0.reset().setLoop(THREE.LoopRepeat, Infinity).play();
        action1.reset().setLoop(THREE.LoopRepeat, Infinity).play();
      }

      return () => {
        action0?.stop();
        action1?.stop();
      };
    }
  }, [actions, animations, playAnimation, listenStory, handleAudioPlay]);

  useEffect(() => {
    return () => {
      // Dispose of WebGL resources
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;

          // Dispose geometry
          mesh.geometry.dispose();

          // Check if material is an array or a single material
          if (Array.isArray(mesh.material)) {
            // Loop through material array and dispose each
            mesh.material.forEach((material) => {
              disposeMaterial(material);
            });
          } else {
            // Single material case
            disposeMaterial(mesh.material);
          }
        }
      });
    };
  }, [scene]);

// Helper function to dispose materials
  const disposeMaterial = (material: THREE.Material) => {
    if (material instanceof THREE.MeshStandardMaterial) {
      if (material.map) material.map.dispose();
      if (material.normalMap) material.normalMap.dispose();
      if (material.roughnessMap) material.roughnessMap.dispose();
      if (material.metalnessMap) material.metalnessMap.dispose();
    } else if (material instanceof THREE.MeshPhongMaterial) {
      if (material.map) material.map.dispose();
      if (material.normalMap) material.normalMap.dispose();
    }
    // Dispose the material itself
    material.dispose();
  };

  return (
    <primitive
      object={scene}
      position={position}
      rotation={rotation}
      scale={
        hovered
          ? [scale[0] + 0.1, scale[1] + 0.1, scale[2] + 0.1]
          : scale
      }
      onClick={handleAudioPlay}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
};

export default Hort;
