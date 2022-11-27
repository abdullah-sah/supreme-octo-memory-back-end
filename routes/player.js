const { Router } = require("express");
const playerRouter = Router();

// Importing db models
const { Player, Team } = require("../models/");

// Get all players in db
playerRouter.get("/", async (req, res) => {
	try {
		const players = await Player.findAll();
		res.send({ success: true, players });
	} catch (err) {
		res.send({ success: false, error: err.message });
	}
});

// Get a player given a name
playerRouter.get("/:name", async (req, res) => {
	try {
		const player = await Player.findOne({ where: { name: req.params.name } });
		res.send({ success: true, player });
	} catch (err) {
		res.send({ success: false, error: err.message });
	}
});

//

module.exports = playerRouter;
