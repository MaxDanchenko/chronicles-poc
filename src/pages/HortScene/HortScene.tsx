import styled from '@emotion/styled';
import { Theme, useTheme } from '@mui/material';
import CanvasApp from '../../components/canvas/CanvasApp.tsx';

type Props = {
 className?: string;
}

const HortScene = ({className}: Props) => {
  const theme = useTheme();

  return (
    <Wrapper className={className} theme={theme} data-testid="hortScene">
      <CanvasApp />
    </Wrapper>
  );
};

export default HortScene;

const Wrapper = styled.div<{ theme: Theme}>`

`;