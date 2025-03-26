import axios from "axios";

export const fetchSongs = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/trending/fetchSongs"
    );
    dispatch({ type: "SET_SONGS", payload: response.data.data });
  } catch (error) {
    console.error("Error fetching songs:", error);
  }
};

// Export setCurrentSong action
export const setCurrentSong = (song) => ({
  type: "SET_CURRENT_SONG",
  payload: song,
});
