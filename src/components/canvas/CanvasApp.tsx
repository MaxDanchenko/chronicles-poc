import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import Hort from '../models/Hort.tsx';
import styled from '@emotion/styled';
import { Environment } from '@react-three/drei';
import { Button } from '@mui/material';
import RotatingCamera from '../models/RotatingCamera.tsx';
import CaptionScroll from '../common/CaptionScroll/CaptionScroll.tsx';

const captions = [
  'Хорт — центральний персонаж нашого епосу,!',
  'перший козак-характерник',
  'містичний воїн-маг української історії',
  'і той, кого старанно з неї стирали.',
  'Герой, в якому зійшлись гідність,',
  'сміливість та сила українського козацтва.',
  'Хорт — це не просто наше минуле,',
  'а символ непохитної сили нашої землі',
  'та її людей у всі часи.',
  'І зараз цій Силі час ожити і стати могутньою як ніколи!',
];

const CanvasApp = () => {
  const [playAnimation, setPlayAnimation] = useState<boolean>(false);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [showCaption, setShowCaption] = useState(false);
  const [cameraSpeed, setCameraSpeed] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onClickHandler = () => {
    window.history.back();
  };

  return (
    <Wrapper screenHeight={screenHeight}>

      <ButtonsContainer>
        <Button variant={'contained'}
                onClick={onClickHandler}>Назад</Button>
        <Button variant={'contained'}
                onClick={() => setPlayAnimation(!playAnimation)}>Анімація</Button>
        <Button variant={'contained'}
                onClick={() => setShowCaption(!showCaption)}>Історія</Button>
        <Button variant={'contained'}
                onClick={() => {
                  if (cameraSpeed) {
                    setCameraSpeed(0);
                  } else {
                    setCameraSpeed(0.2);
                  }
                }}>Камера</Button>
      </ButtonsContainer>

      <Canvas
        shadows
        camera={{ position: [0, -100, -300], fov: 50 }}
        gl={{ alpha: true }}
        style={{ background: 'transparent' }}
        onCreated={({ camera }) => {
          camera.lookAt(0, -500, 0);
        }}
      >
        {/* Lights */}
        <directionalLight
          position={[10, 20, 10]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <ambientLight intensity={1} />

        {/* HDRI Background */}
        <Environment
          files="/assets/nlf/forest2.jpg"
          background
        />

        <RotatingCamera radius={700} lookAt={[0, -80, 0]} speed={cameraSpeed} />
        <Hort
          playAnimation={playAnimation}
          modelLink="/assets/hort-optimized.glb"
          position={[0, -450, 0]}
          scale={[250, 250, 250]}
          listenStory={showCaption}
          handleCaption={() => setShowCaption(!showCaption)}
        />
      </Canvas>

      {
        showCaption &&
        <CaptionWrapper>
          <CaptionScroll captions={captions} duration={50} />
        </CaptionWrapper>
      }
    </Wrapper>
  );
};

export default CanvasApp;

const Wrapper = styled.section<{ screenHeight: number }>`
    width: 100%;
    height: ${({ screenHeight }) => screenHeight}px;
    overflow: hidden;
    background: transparent;
`;

const CaptionWrapper = styled.div`
    top: 70px;
    left: 0;
    position: absolute;
    z-index: 1;
    width: 100vw;
`;
const ButtonsContainer = styled.div`
    position: absolute;
    z-index: 2;
    display: flex;
    width: 100vw;
    padding: 10px 5px;
    justify-content: space-between;
`;