const { Player, Team } = require("../models/");
const db = require("../db/db");

const seed = async () => {
	await db.sync({ force: true });

	const players = await Player.bulkCreate([
		{
			name: "Messi",
		},
		{
			name: "Iniesta",
		},
		{
			name: "Xavi",
		},
		{
			name: "Ronaldinho",
		},
		{
			name: "Valdez",
		},
		{
			name: "Puyol",
		},
		{
			name: "Gavi",
		},
		{
			name: "Pedri",
		},
	]);

	const teams = await Team.bulkCreate([
		{
			name: "Barca",
			size: 11,
		},
		{
			name: "Barca Otra Vez",
			size: 11,
		},
		{
			name: "Barca Final Boss",
			size: 11,
		},
	]);

	const [barca1, barca2, barca3] = teams;
	barca1.addPlayers(players.slice(0, 3));
	barca2.addPlayers(players.slice(3, 6));
	barca3.addPlayers(players.slice(6, 8));

	console.log("Database populated :)");
};

module.exports = seed;
