const axios = require("axios");

const API_URL = process.env.API_URL;

const fetchTracks = async (req, res) => {
  try {
    const { data } = await axios.get(API_URL);
    const API_HOST = data.data[0];

    const response = await axios.get(
      `${API_HOST}/v1/tracks/trending?app_name=muzicana`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({ error: "Failed to fetch songs" });
  }
};

module.exports = fetchTracks;
