const { Player, Team } = require("../models");

const playerExistsInTeam = async (playerId, teamId) => {
	const player = await Player.findByPk(playerId);
	const team = await Team.findByPk(teamId);

	const playerTeams = await player.getTeams();
	let found = false;
	playerTeams.forEach((value) => {
		if (value.id == teamId) {
			found = true;
			return true;
		}
	});
	return found ? true : false;
};

module.exports = playerExistsInTeam;
