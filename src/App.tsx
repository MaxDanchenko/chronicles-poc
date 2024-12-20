import styled from '@emotion/styled';
import HortScene from './pages/HortScene/HortScene.tsx';

const App = () => {
  return (
    <Wrapper data-testid="app">
      <HortScene />
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    background: none;
`;