import React, { useRef, useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';

export default function AudioComponent() {
  const playerRef = useRef(null);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    // Attempt to play on mount
    const attemptPlay = () => {
      if (playerRef.current && playerRef.current.audioEl.current) {
        playerRef.current.audioEl.current.play().catch(error => {
          console.log("Autoplay prevented:", error);
          setAutoplayBlocked(true);
        });
      }
    };

    // Delay the attempt to ensure the audio element is available
    const timeoutId = setTimeout(attemptPlay, 100);

    // Add event listeners for various user interactions
    const handleUserInteraction = () => {
      if (autoplayBlocked) {
        handlePlay();
      }
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('scroll', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('mousemove', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('mousemove', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [autoplayBlocked]);

  const handlePlay = () => {
    if (playerRef.current && playerRef.current.audioEl.current) {
      playerRef.current.audioEl.current.play();
      setAutoplayBlocked(false);
    }
  };

  return (
    <div>
      <ReactAudioPlayer
        ref={playerRef}
        src="/audio_eZeBTJnZ.mp3"
        autoPlay={true}
        controls={false} // Hide the audio player controls
        onPlay={() => console.log("Audio is playing")}
      />
      {autoplayBlocked && (
        <button onClick={handlePlay}>Play Audio</button>
      )}
    </div>
  );
}