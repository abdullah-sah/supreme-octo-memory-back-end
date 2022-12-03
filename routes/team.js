const { Router } = require("express");
const teamRouter = Router();
const { Player, Team } = require("../models/");

// utilities
const { isValidId, isIdOrName, throwError } = require("../utilities/index");

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
		const identifier = isIdOrName(req.params.identifier);

		// grabbing number of teams (rows) in database model
		const count = await Team.count();

		// if number passed in > number of rows in table, return error
		const valid = isValidId(identifier, count);
		if (!valid && identifier !== null) throwError("That team don't exist mate");

		// if identifier is NOT null => findByPk(identifier) --- else => findOne where name = string passed in
		const team = identifier
			? await Team.findByPk(identifier)
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
		const identifier = isIdOrName(req.params.identifier);

		// grabbing number of teams in db model
		const count = await Team.count();

		// making sure id is valid (is not > 0 or < count)
		const valid = isValidId(identifier, count);
		if (!valid) throwError("That team don't exist mate");

		identifier
			? await Team.destroy({ where: { id: identifier } })
			: await Team.destroy({ where: { name: req.params.identifier } });

		res.send({ success: true });
	} catch (err) {
		res.status(404).send({ success: false, error: err.message });
	}
});

// Put a new player in a specific team given a team id
teamRouter.put("/:teamId/player/:playerId", async (req, res) => {
	try {
		const teamCount = await Team.count();
		const playerCount = await Player.count();
		const playerValid = isValidId(req.params.playerId, playerCount);
		const teamValid = isValidId(req.params.teamId, teamCount);
		if (!teamValid || !playerValid) {
			// if the team is invalid, give value of 'team'. if player is invalid, give value of 'player'
			const teamOrPlayer = !teamValid ? "team" : "player";
			throwError(`No ${teamOrPlayer} with that id exists`);
		}

		const team = await Team.findByPk(req.params.teamId);
		const player = await Player.findByPk(req.params.playerId);

		const playerTeams = await player.getTeams();
		playerTeams.forEach((value, index, arr) => {
			if (value.id === team.id) {
				throwError(
					"I'm afraid that player is already in your team you muppet."
				);
			}
		});

		await team.addPlayers(player);
		const newTeam = await Team.findByPk(req.params.teamId);
		res.send({ success: true, newTeam });
	} catch (err) {
		res.status(404).send({ success: false, error: err.message });
	}
});
module.exports = teamRouter;
