/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

type Props = {
  captions: string[];
  duration?: number;
};

const CaptionScroll = ({ captions, duration = 20 }: Props) => {
  return (
    <Container>
      <ScrollArea duration={duration}>
        {captions.concat(captions).map((text, index) => (
          <Caption key={index}>{text}</Caption>
        ))}
      </ScrollArea>
    </Container>
  );
};

export default CaptionScroll;

const scrollUp = keyframes`
    0% {
        transform: translateY(0%);
    }
    100% {
        transform: translateY(-100%);
    }
`;

const Container = styled.div`
    position: relative;
    height: 27vh;
    width: 95%;
    overflow: hidden;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    border-radius: 20px;
    
    background-color: rgba(0, 0, 0, 0.3); /* Semi-transparent background */
    backdrop-filter: blur(10px); /* Apply blur effect */
    -webkit-backdrop-filter: blur(10px); /* Safari support */
`;

const ScrollArea = styled.div<{ duration: number }>`
    position: absolute;
    top: 0;
    width: 100%;
    animation: ${scrollUp} ${({ duration }) => duration}s linear infinite;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const Caption = styled.p`
    font-size: 20px;
    margin: 1rem 0;
    opacity: 0.9; /* Slight transparency for style */
`;

// Ensure enough content height to loop seamlessly
ScrollArea.defaultProps = {
  style: {
    transformOrigin: 'center bottom',
    willChange: 'transform',
  },
};
