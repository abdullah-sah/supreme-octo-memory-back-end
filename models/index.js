const Player = require("../models/player.model");
const Team = require("../models/team.model");

Player.belongsToMany(Team, { through: "Player_Team" });
Team.belongsToMany(Player, { through: "Player_Team" });

module.exports = { Player, Team };
