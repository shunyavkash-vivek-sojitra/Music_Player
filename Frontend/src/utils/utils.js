// Standardized function to get the highest quality artwork URL
export const getArtworkURL = (artwork) => {
  if (!artwork) return "fallback-image.jpg";
  if (typeof artwork === "string")
    return artwork.replace("{w}x{h}", "1000x1000");
  return (
    artwork["1000x1000"] ||
    artwork["480x480"] ||
    artwork["150x150"] ||
    "fallback-image.jpg"
  );
};
