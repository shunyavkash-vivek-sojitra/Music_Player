const express = require("express");
const env = require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const route = require("./routes/indexRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Discovery Provider
async function getDiscoveryNode() {
  try {
    const response = await axios.get(
      "https://api.audius.co/v1/discovery_provider/health_check"
    );
    if (response.data && response.data.data) {
      return response.data.data[0]; // Pick the first working node
    }
  } catch (error) {
    console.error("Error fetching discovery node:", error.message);
  }
  return "https://discoveryprovider.audius.co"; // Fallback URL
}

// Fetch track details
app.get("/api/tracks/:id", async (req, res) => {
  try {
    const discoveryNode = await getDiscoveryNode();
    const trackId = req.params.id;
    const response = await axios.get(`${discoveryNode}/v1/tracks/${trackId}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching track details:", error.message);
    res.status(500).json({ error: "Failed to fetch track details" });
  }
});

// Fetch a single track
app.get("/api/tracks/:id/stream", async (req, res) => {
  try {
    const discoveryNode = await getDiscoveryNode();
    const trackId = req.params.id;

    // Request the stream URL (Audius sends a redirect)
    const response = await axios.get(
      `${discoveryNode}/v1/tracks/${trackId}/stream`,
      {
        maxRedirects: 0,
        validateStatus: (status) => status >= 200 && status < 400,
      }
    );

    if (response.status === 302 || response.status === 301) {
      const streamUrl = response.headers.location;
      res.json({ streamUrl });
    } else {
      throw new Error("Invalid response from Audius API");
    }
  } catch (error) {
    console.error("Error fetching stream URL:", error.message);
    res.status(500).json({ error: "Failed to fetch stream URL" });
  }
});

app.use("/api/collection", route);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`* Server is running on port ${PORT}`));
