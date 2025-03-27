import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentSong } from "../services/actions";

const SongCard = ({ song }) => {
  const dispatch = useDispatch();

  const handlePlay = () => {
    dispatch(setCurrentSong(song));
  };

  return (
    <div className="song-card" onClick={handlePlay}>
      <img
        src={song.artwork?.["150x150"] || "fallback-image.jpg"}
        alt={song.title}
      />
      <h3>{song.title || "Unknown Title"}</h3>
      <p>{song.artist || "Unknown Artist"}</p>
    </div>
  );
};

export default SongCard;
