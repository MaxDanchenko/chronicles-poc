import { Text } from '@react-three/drei';

const Score3D = ({ score, position }: { score: number; position: [number, number, number] }) => {
    return (
        <Text
            position={position}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
        >
            {`Score: ${score}`}
        </Text>
    );
};

export default Score3D;