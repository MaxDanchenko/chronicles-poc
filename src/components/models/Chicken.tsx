// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useState } from 'react';

type Props = {
  position?: [number, number, number],
  rotation?: [number, number, number],
  scale?: [number, number, number],
}

const Chicken = ({ position, rotation, scale }: Props): JSX.Element => {
  const { scene, animations } = useGLTF("/assets/chicken.glb");
  const { actions } = useAnimations(animations, scene);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (actions) {
      const idleAction = actions["RPG_Armed_Idle"];
      if (idleAction) {
        idleAction.play();
      }
    }
  }, [actions]);

  useEffect(() => {
    scene.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true; // Allow the mesh to cast shadows
        node.receiveShadow = true; // Allow the mesh to receive shadows
      }
    });
  }, [scene]);

  const handleClick = () => {
    if (!actions) return;

    const runAction = actions["RPG_Armed_Cast_R_Attack3"];
    if (runAction) {
      runAction.reset();
      runAction.setLoop(THREE.LoopOnce);
      runAction.clampWhenFinished = true;
      runAction.play();

      runAction.onFinished = () => {
        const idleAction = actions["RPG_Armed_Idle"];
        if (idleAction) {
          idleAction.play();
        }
      };
    }
  };
  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);


  return (
    <primitive
      object={scene}
      position={position}
      scale={hovered ? [scale[0] + 0.1, scale[1] + 0.1, scale[2] + 0.1] : scale}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      rotation={rotation}
    />
  );
};

export default Chicken;
