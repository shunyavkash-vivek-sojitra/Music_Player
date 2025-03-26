import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const currentSong = useSelector((state) => state.currentSong);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.stream_url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentSong]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="audio-player">
      {currentSong && (
        <>
          <p>{currentSong.title}</p>
          <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
          <audio ref={audioRef} />
        </>
      )}
    </div>
  );
};

export default AudioPlayer;
