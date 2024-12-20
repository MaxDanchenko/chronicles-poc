import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
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
                handleCaption = () => {}
              }: Props) => {
  const { scene, animations } = useGLTF(modelLink);
  const { actions } = useAnimations(animations, scene);
  const isPlayingRef = useRef(false);
  const [hovered, setHovered] = useState(false); // Track hover state
  const [play] = useSound('/audio/hort_audio.mp3');

  const handleAudioPlay = () => {
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
  };

  useEffect(() => {
    if (listenStory) {
      handleAudioPlay();
    }

    if (animations.length >= 2) {
      const action0 = actions[animations[0]?.name]; // Animation part 0
      const action1 = actions[animations[1]?.name]; // Animation part 1

      if (playAnimation && action0 && action1) {
        // Reset both actions
        action0.reset();
        action1.reset();

        // Set loop for both animations
        action0.setLoop(THREE.LoopRepeat, Infinity);
        action1.setLoop(THREE.LoopRepeat, Infinity);

        // Sync both animations by starting them simultaneously
        action0.time = 0;
        action1.time = 0;

        // Play both animations
        action0.play();
        action1.play();
      }

      return () => {
        // Stop both actions on cleanup
        action0?.stop();
        action1?.stop();
      };
    }
  }, [actions, animations, playAnimation, listenStory, handleAudioPlay]);

  return (
    <primitive
      object={scene}
      position={position}
      rotation={rotation}
      scale={hovered ? [scale[0] + 0.1, scale[1] + 0.1, scale[2] + 0.1] : scale}
      onClick={handleAudioPlay}
      onPointerOver={() => setHovered(true)} // Trigger hover state
      onPointerOut={() => setHovered(false)} // Reset hover state
    />
  );
};

export default Hort;