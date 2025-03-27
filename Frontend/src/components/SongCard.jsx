import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentSong } from "../services/actions";
import { getArtworkURL } from "../utils/utils.js";

const SongCard = ({ song }) => {
  const dispatch = useDispatch();

  const handlePlay = () => {
    dispatch(setCurrentSong(song));
  };

  return (
    <div className="song-card" onClick={handlePlay}>
      <img src={getArtworkURL(song.artwork)} alt={song.title} />
      <h3>{song.title || "Unknown Title"}</h3>
      <p>{song.artist || "Unknown Artist"}</p>
    </div>
  );
};

export default SongCard;
