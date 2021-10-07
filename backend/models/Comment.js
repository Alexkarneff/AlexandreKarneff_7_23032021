module.exports = (sequelize, DataTypes) => {
	const Comments = sequelize.define("Comments", {
		content: {
			type: DataTypes.STRING,
			allowNull: false
		},
	});
	return Comments;
};

