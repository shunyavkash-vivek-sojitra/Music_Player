import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentSong } from "../services/actions";

const Slider = ({ title, items }) => {
  const dispatch = useDispatch();

  const handlePlay = (song) => {
    dispatch(setCurrentSong(song));
  };

  return (
    <div className="slider-section">
      <h2 className="slider-title">{title}</h2>
      <div className="slider-container">
        {items.map((song, index) => (
          <div
            key={index}
            className="slider-item"
            onClick={() => handlePlay(song)}
          >
            <img
              src={song.artworkURL}
              alt={song.title}
              className="slider-image"
            />
            <p className="slider-text">{song.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
