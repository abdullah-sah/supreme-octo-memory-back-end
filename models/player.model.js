const { DataTypes, Model } = require("sequelize");
const db = require("../db/db");

class Player extends Model {}

Player.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			unique: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ sequelize: db }
);

module.exports = Player;
