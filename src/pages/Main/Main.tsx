import styled from '@emotion/styled';
import { Button, Theme, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppRoutes, RoutePath } from '../../router/routeConfig.tsx';

type Props = {
  className?: string;
}

const Main = ({ className }: Props) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(RoutePath[AppRoutes.HORT])
  };

  return (
    <Wrapper className={className} theme={theme} data-testid="main">
      <StartButton variant={'contained'}
              onClick={onClickHandler}>Start</StartButton>
    </Wrapper>
  );
};

export default Main;

const Wrapper = styled.div<{ theme: Theme }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: url('/assets/bg/bg2.jpg') no-repeat center center / cover;
`;
const StartButton = styled(Button)`
    position: absolute;
    top: 63%;
    padding: 10px 40px;
    border-radius: 20px;
`;