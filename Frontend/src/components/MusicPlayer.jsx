import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";

const API_BASE = "http://localhost:5000/api/tracks"; // Backend API

const MusicPlayer = () => {
  const currentSong = useSelector((state) => state.currentSong);
  const audioRef = useRef(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [streamUrl, setStreamUrl] = useState(null);
  const [artworkUrl, setArtworkUrl] = useState("/default-image.jpg");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentSong?.id) return;

    const fetchTrackDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("🎵 Fetching details for track:", currentSong.id);

        // ✅ Fetch track details
        const response = await fetch(`${API_BASE}/${currentSong.id}`);
        if (!response.ok) throw new Error("Failed to fetch track details");

        const { data: trackDetails } = await response.json();
        console.log("✅ Track Details:", trackDetails);

        // ✅ Set artwork (ensure it's valid)
        let artwork = trackDetails?.artwork;
        if (typeof artwork === "object" && artwork?.url) {
          artwork = artwork.url;
        }

        if (
          !artwork ||
          typeof artwork !== "string" ||
          !artwork.startsWith("http")
        ) {
          artwork = "/default-image.jpg";
        }

        console.log("🎨 Artwork URL:", artwork);
        setArtworkUrl(artwork);

        // ✅ Fetch stream URL
        const streamResponse = await fetch(
          `${API_BASE}/${currentSong.id}/stream`
        );
        const { streamUrl } = await streamResponse.json();
        if (!streamUrl) throw new Error("Invalid stream URL");

        console.log("✅ Stream URL:", streamUrl);

        // ✅ Stop previous audio before updating
        audioRef.current.pause();
        audioRef.current.src = ""; // Clear source
        setStreamUrl(streamUrl);
        setIsPlaying(true); // Auto-play when song loads
      } catch (error) {
        console.error("❌ Error fetching track details or stream:", error);
        setStreamUrl(null);
        setArtworkUrl("/default-image.jpg");
        setError("Song cannot be played.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrackDetails();
  }, [currentSong]);

  useEffect(() => {
    if (!streamUrl) return;

    const audio = audioRef.current;
    audio.src = streamUrl;

    // ✅ Auto-play the song
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.error("❌ Play error:", err);
        setIsPlaying(false);
      });

    // ✅ Ensure play/pause works properly
    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", handleEnded);
    };
  }, [streamUrl]);

  const togglePlay = () => {
    if (!streamUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch((err) => console.error("❌ Play error:", err));
    }
    setIsPlaying(!isPlaying);
  };

  if (!currentSong) return null;

  return (
    <div className="music-player">
      <div className="player-info">
        <img
          src={artworkUrl}
          alt={currentSong.title || "No Image"}
          className="player-image"
          onError={(e) => (e.target.src = "/default-image.jpg")}
        />
        <div>
          <p className="player-title">{currentSong.title}</p>
          <p className="player-artist">
            {currentSong.artist || "Unknown Artist"}
          </p>
        </div>
      </div>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <button
          className="play-button"
          onClick={togglePlay}
          disabled={!streamUrl}
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>
      )}
    </div>
  );
};

export default MusicPlayer;
