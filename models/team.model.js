const { DataTypes, Model } = require("sequelize");
const db = require("../db/db");

class Team extends Model {}

Team.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		size: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			validate: {
				max: 11,
				min: 0,
			},
		},
	},
	{ sequelize: db }
);

module.exports = Team;
