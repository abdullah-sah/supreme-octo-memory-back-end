const express = require("express");
const app = express();
const PORT = 5001;
const cors = require("cors");
const playerRouter = require("../routes/player.js");
const teamRouter = require("../routes/team.js");

// Using JSON
app.use(express.json());
app.use(cors());
app.use("/team", teamRouter);
app.use("/player", playerRouter);

app.listen(PORT, () => {
	console.log(`Listening on Port ${PORT}`);
});
