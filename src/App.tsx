import styled from '@emotion/styled';
import { AppRouter } from './router';

const App = () => {
  return (
    <Wrapper data-testid="app">
      <AppRouter />
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    background: none;
`;