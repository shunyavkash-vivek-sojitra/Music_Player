const express = require("express");
const cors = require("cors");
const app = express();
const route = require("./routes/songRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/trending", route);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
