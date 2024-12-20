import { Canvas } from '@react-three/fiber';
import styled from '@emotion/styled';
import { Theme, useTheme } from '@mui/material';
import Hort from '../../components/models/Hort.tsx';
import Chicken from '../../components/models/Chicken.tsx';
import Medusa from '../../components/models/Medusa.tsx';
import RockyGround from '../../components/models/RockyGround.tsx';
import { useNavigate } from 'react-router-dom';
import { AppRoutes, RoutePath } from '../../router/routeConfig.tsx';

type Props = {
  className?: string;
};


const DefaultCamera = () => (
  <perspectiveCamera
    position={[0, 0, 600]}
    fov={200}
    near={0.1}
    far={2000}
  />
);

const DefaultLights = () => (
  <>
    <ambientLight intensity={1} />
    <directionalLight position={[10, 10, 10]} intensity={1} />
  </>
);

const Cards = ({ className }: Props) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Wrapper className={className} theme={theme} data-testid="cards">
      <Scrollable>
        <Canvas shadows>
          <DefaultCamera />
          <DefaultLights />

          <Chicken position={[0.1, 2, 0]} rotation={[0.2, 0, 0]} scale={[0.55, 0.55, 0.55]} />
          <Medusa position={[0, 0, 0]} rotation={[0, 0, 0]} scale={[0.004, 0.004, 0.004]} />

          <Hort
            modelLink="/assets/hort-optimized.glb"
            position={[0, -2.3, 0]}
            scale={[0.8, 0.8, 0.8]}
            rotation={[-0.1, 0, 0]}
            onChoose={() => navigate(RoutePath[AppRoutes.HORT])}
          />
          <RockyGround      rotation={[-0.1, 0, 0]} position={[0, -2.3, 0]} scale={[0.1, 0.1, 0.1]} />


          {/*<OrbitControls />*/}
        </Canvas>
      </Scrollable>
    </Wrapper>
  );
};

export default Cards;

const Wrapper = styled.div<{ theme: Theme }>`
    height: 100vh;
    width: 100vw;
    overflow-y: auto; /* Enables scrolling */
    scroll-behavior: smooth; /* Smooth scrolling */
    background: url(/assets/nlf/forest2.jpg) no-repeat center center / cover;
`;
const Scrollable = styled.div`
    height: 300vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;