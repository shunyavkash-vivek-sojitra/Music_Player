import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getArtworkURL } from "../utils/utils.js";

const MusicPlayer = () => {
  const currentSong = useSelector((state) => state.currentSong);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [currentSong, isPlaying]);

  if (!currentSong) return null;

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="music-player">
      <div className="player-info">
        <img
          src={getArtworkURL(currentSong.artwork)}
          alt={currentSong.title}
          className="player-image"
        />
        <div>
          <p className="player-title">{currentSong.title}</p>
          <p className="player-artist">
            {currentSong.artist || "Unknown Artist"}
          </p>
        </div>
      </div>

      <audio ref={audioRef} src={currentSong.stream_url} />

      <button className="play-button" onClick={togglePlay}>
        {isPlaying ? "❚❚" : "▶"}
      </button>
    </div>
  );
};

export default MusicPlayer;
