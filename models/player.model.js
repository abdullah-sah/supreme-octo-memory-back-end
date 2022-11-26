const { DataTypes, Model } = require("sequelize");
const db = require("../db/db");

class Player extends Model {}

Player.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			unique: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true,
		},
	},
	{ sequelize: db }
);

module.exports = Player;
