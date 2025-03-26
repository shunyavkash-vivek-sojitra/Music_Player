import React from "react";

const Slider = ({ title, items }) => {
  return (
    <div className="slider-section">
      <h2 className="slider-title">{title}</h2>
      <div className="slider-container">
        {items.map((item, index) => (
          <div key={index} className="slider-item">
            <img
              src={item.artworkURL}
              alt={item.title}
              className="slider-image"
            />
            <p className="slider-text">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
