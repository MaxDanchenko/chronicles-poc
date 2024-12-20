import { useEffect, useRef } from 'react';
import { VideoTexture, BackSide, MeshStandardMaterial } from 'three';

type Props = {
  videoPath: string; // Path to the video file
  size?: number; // Size of the box
};

const VideoBoxEnvironment = ({ videoPath, size = 1 }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(document.createElement('video'));
  const videoTextureRef = useRef<VideoTexture>();

  useEffect(() => {
    const video = videoRef.current;

    // Set video attributes
    video.src = videoPath;
    video.loop = true;
    video.muted = true; // Auto-play requires video to be muted
    video.playsInline = true;
    video.play();

    // Create the VideoTexture
    videoTextureRef.current = new VideoTexture(video);
    videoTextureRef.current.needsUpdate = true;
  }, [videoPath]);

  const videoMaterial = new MeshStandardMaterial({
    map: videoTextureRef.current,
    side: BackSide, // Render the inside of the box
  });

  return (
    <mesh>
      <boxGeometry args={[size, size, size]} />
      <primitive attachArray="material" object={videoMaterial} />
      <primitive attachArray="material" object={videoMaterial} />
      <primitive attachArray="material" object={videoMaterial} />
      <primitive attachArray="material" object={videoMaterial} />
      <primitive attachArray="material" object={videoMaterial} />
      <primitive attachArray="material" object={videoMaterial} />
    </mesh>
  );
};

export default VideoBoxEnvironment;
