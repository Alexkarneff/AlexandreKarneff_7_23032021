module.exports = (sequelize, DataTypes) => {
	const Users = sequelize.define("Users", {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT
		},
		admin: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			default: false
		},
	});
	return Users;
};