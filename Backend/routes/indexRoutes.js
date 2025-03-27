const express = require("express");
const router = express.Router();
const tracksRoutes = require("./tracksRoutes");

router.use("/tracks", tracksRoutes);

module.exports = router;
