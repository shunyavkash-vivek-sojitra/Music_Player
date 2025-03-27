const express = require("express");
const cors = require("cors");
const axios = require("axios");
const route = require("./routes/songRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Step 1: Get a working Audius discovery node dynamically
async function getDiscoveryNode() {
  try {
    const response = await axios.get(
      "https://api.audius.co/v1/discovery_provider/health_check"
    );
    if (response.data && response.data.data) {
      return response.data.data[0]; // Pick the first working node
    }
  } catch (error) {
    console.error("❌ Error fetching discovery node:", error.message);
  }
  return "https://discoveryprovider.audius.co"; // Fallback URL
}

// ✅ Step 2: Fetch track details
app.get("/api/tracks/:id", async (req, res) => {
  try {
    const discoveryNode = await getDiscoveryNode();
    const trackId = req.params.id;
    const response = await axios.get(`${discoveryNode}/v1/tracks/${trackId}`);
    res.json(response.data);
  } catch (error) {
    console.error("❌ Error fetching track details:", error.message);
    res.status(500).json({ error: "Failed to fetch track details" });
  }
});

// ✅ Step 3: Fetch the actual stream URL
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
    console.error("❌ Error fetching stream URL:", error.message);
    res.status(500).json({ error: "Failed to fetch stream URL" });
  }
});

// ✅ Existing routes
app.use("/api/allsongs", route);

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
