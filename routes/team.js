const { Router } = require("express");
const teamRouter = Router();
const { Player, Team } = require("../models/");

// utilities
const isValidId = require("../utilities/isValidId");
const throwError = require("../utilities/throwError");

// Creates new team and returns it
teamRouter.put("/:name", async (req, res) => {
	try {
		const team = await Team.create({ name: req.params.name });
		res.send({ success: true, team });
	} catch (err) {
		res.status(404).send({ success: false, error: err.message });
	}
});

// Get team given an id or a name
teamRouter.get("/:identifier", async (req, res) => {
	try {
		// storing req.params.identifier as a number. if a string is passed as identifier, toNumber = null
		const toNumber = Number(req.params.identifier);

		// grabbing number of teams (rows) in database model
		const count = await Team.count();

		// if number passed in > number of rows in table, return error
		const valid = isValidId(toNumber, count);
		if (!valid) throwError("That team don't exist mate");

		// if toNumber is NOT null, findByPk(toNumber) --- else findOne where name = string passed in
		const team = toNumber
			? await Team.findByPk(toNumber)
			: await Team.findOne({ where: { name: req.params.identifier } });

		// making sure we actually returned a team from the db model
		team
			? res.send({ success: true, team })
			: throwError("Couldn't find that team mate");
	} catch (err) {
		res.status(404).send({ success: false, error: err.message });
	}
});

// Delete a team given an id or a name
teamRouter.delete("/:identifier", async (req, res) => {
	try {
		// storing req.params.identifier as a number => if is name not id, will be equal to null
		const toNumber = Number(req.params.identifier);

		// grabbing number of teams in db model
		const count = await Team.count();

		// making sure id is valid (is not > 0 or < count)
		const valid = isValidId(toNumber, count);
		if (!valid) throwError("That team don't exist mate");

		toNumber
			? await Team.destroy({ where: { id: toNumber } })
			: await Team.destroy({ where: { name: req.params.identifier } });

		res.send({ success: true });
	} catch (err) {
		res.status(404).send({ success: false, error: err.message });
	}
});

module.exports = teamRouter;
