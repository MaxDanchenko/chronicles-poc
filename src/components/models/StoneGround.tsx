import {useGLTF} from '@react-three/drei';

type Props = {
    position?: [number, number, number];
    scale?: [number, number, number];
    rotation?: [number, number, number];
}

const StoneGround = ({position, rotation, scale}: Props) => {
    const {scene} = useGLTF('/assets/field.glb');
    return <primitive position={position} rotation={rotation} scale={scale} object={scene}/>;
};

export default StoneGround
