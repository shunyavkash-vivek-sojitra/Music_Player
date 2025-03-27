const express = require("express");
const router = express.Router();
const fetchTracks = require("../controllers/fetchTracks");

router.get("/fetchAll", fetchTracks);

module.exports = router;
