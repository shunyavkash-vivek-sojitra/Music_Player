const express = require("express");
const router = express.Router();
const songRoutes = require("./songRoutes");

router.use("/", songRoutes);

module.exports = router;
