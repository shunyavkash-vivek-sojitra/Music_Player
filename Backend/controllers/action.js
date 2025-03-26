import axios from "axios";

const API_URL = process.env.API_URL;

export const fetchSongs = () => async (dispatch) => {
  try {
    const response = await axios.get(API_URL);
    console.log();
    dispatch({ type: "SET_SONGS", payload: response.data.data });
  } catch (error) {
    console.error("Error fetching songs:", error);
  }
};
