const Player = require("./player.model");
const Team = require("./team.model");

Team.hasMany(Player);
Player.belongsTo(Team);

module.exports = { Player, Team };
