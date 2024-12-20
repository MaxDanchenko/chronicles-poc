// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useState } from 'react';

type Props = {
  position?: [number, number, number],
  rotation?: [number, number, number],
  scale?: [number, number, number],
}

const Medusa = ({ position, rotation, scale }: Props): JSX.Element => {
  const { scene, animations } = useGLTF('/assets/medusa.glb');
  const { actions } = useAnimations(animations, scene);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (actions) {
      const idleAction = actions['Parado'];
      if (idleAction) {
        idleAction.play();
      }
    }
  }, [actions]);

  const handleClick = () => {
    if (!actions) return;

    const attackAction = actions['Ataque'];
    if (attackAction) {
      attackAction.reset();
      attackAction.setLoop(THREE.LoopOnce);
      attackAction.clampWhenFinished = true;
      attackAction.play();

      attackAction.onFinished = () => {
        const idleAction = actions['Parado'];
        if (idleAction) {
          idleAction.play();
        }
      };
    }
  };
  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);

  return <primitive scale={hovered ? [scale[0] + 0.001, scale[1] + 0.001, scale[2] + 0.001] : scale}
                    onPointerOver={handlePointerOver}
                    onPointerOut={handlePointerOut}
                    onClick={handleClick}
                    object={scene}
                    position={position}
                    rotation={rotation} />;
};

export default Medusa;
