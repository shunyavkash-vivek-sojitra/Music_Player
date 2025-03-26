const express = require("express");
const router = express.Router();
const fetchSongs = require("../controllers/fetchSongs");

router.get("/fetchSongs", fetchSongs);

module.exports = router;
