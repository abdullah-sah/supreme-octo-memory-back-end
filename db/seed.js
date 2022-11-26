const db = require("./db");
const { Player, Team } = require("../models/");

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

	const [messi, iniesta, xavi, ronaldinho, valdez, puyol, gavi, pedri] =
		players;
	const [barca1, barca2, barca3] = teams;

	await barca1.setPlayers([messi, iniesta, gavi]);
	await barca2.setPlayers([xavi, ronaldinho, pedri]);
	await barca3.setPlayers([valdez, puyol]);

	console.log("Database populated :)");
};

module.exports = seed;
