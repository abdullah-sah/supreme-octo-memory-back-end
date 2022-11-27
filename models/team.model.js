const { DataTypes, Model } = require("sequelize");
const db = require("../db/db");

class Team extends Model {}

Team.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			unique: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		size: {
			type: DataTypes.INTEGER,
			defaultValue: 11,
		},
	},
	{ sequelize: db }
);

module.exports = Team;
