module.exports = (sequelize, Sequelize) => {
	const Post = sequelize.define("Post", {
		title: {
			type: Sequelize.STRING,
			allowNull: false
		},
		postDate: {
			type: Sequelize.DATE,
			allowNull: false
		},
		text: {
			type: Sequelize.TEXT,
		},
		likes: {
			type: Sequelize.INTEGER,
			unsigned: true,
			default: 0
		},
		imageURL: {
			type: Sequelize.STRING
		}
	});
	return Post;
}