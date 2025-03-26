import React from "react";
import { useSelector } from "react-redux";
import SongCard from "../components/SongCard";
import Slider from "../components/Slider";

// to get the highest quality image
const getArtworkURL = (artwork) => {
  if (!artwork) return "";
  if (typeof artwork === "string")
    return artwork.replace("{w}x{h}", "1000x1000"); // Ensure high resolution
  return artwork["1000x1000"] || artwork["480x480"] || artwork["150x150"] || ""; // Best available
};

const Home = () => {
  const songs = useSelector((state) => state.songs);

  return (
    <div className="home">
      {/* Hero Section */}
      {songs.length > 0 && (
        <div className="hero-section">
          <div className="hero-overlay">
            <h1 className="hero-title">{songs[0].title}</h1>
            <p className="hero-artist">
              By {songs[0].artist || "Unknown Artist"}
            </p>
          </div>
          <img
            src={getArtworkURL(songs[0]?.artwork)}
            alt="Hero Song"
            className="hero-image"
          />
        </div>
      )}

      {/* Trending Songs Slider */}
      {songs.length > 0 && (
        <Slider
          title="🔥 Trending Songs"
          items={songs.slice(0, 15).map((song) => ({
            ...song,
            artworkURL: getArtworkURL(song?.artwork),
          }))}
        />
      )}

      {/* Song Grid Section */}
      <h2 className="section-title">All Songs</h2>
      <div className="song-grid">
        {songs.length > 0 ? (
          songs.map((song) => <SongCard key={song.id} song={song} />)
        ) : (
          <div className="loading">Loading songs...</div>
        )}
      </div>
    </div>
  );
};

export default Home;
