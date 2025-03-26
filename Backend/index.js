const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_URL = process.env.API_URL;

app.use(cors());
app.use(express.json());

app.get("/api/trending", async (req, res) => {
  try {
    const { data } = await axios.get(API_URL);
    const API_HOST = data.data[0];

    const response = await axios.get(
      `${API_HOST}/v1/tracks/trending?app_name=my_music_app`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({ error: "Failed to fetch songs" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
