module.exports = (sequelize, Sequelize) => {
	const Post = sequelize.define("Post", {
		title: {
			type: Sequelize.STRING,
			allowNull: false
		},
		text: {
			type: Sequelize.TEXT,
		},
		imageURL: {
			type: Sequelize.STRING
		}
	});
	return Post;
}