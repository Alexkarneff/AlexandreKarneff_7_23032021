const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./User")(sequelize, Sequelize);
db.post = require("./Post")(sequelize, Sequelize);
db.comment = require("./Comment")(sequelize, Sequelize);

// post et user
db.post.belongsTo(db.user, {
	foreignKey: {
		name: 'userId',
		allowNull: false
	},
	onDelete: 'CASCADE',
	onUpdate: 'NO ACTION',
});

// comment et user
db.comment.belongsTo(db.user, {
	foreignKey: {
		name: 'userId',
		allowNull: false
	},
	onDelete: 'CASCADE', 
	onUpdate: 'NO ACTION',
});

// post et comment 
db.post.hasMany(db.comment);
db.comment.belongsTo(db.post, {
	foreignKey: {
		name: 'postId',
		allowNull: false
	},
	onDelete: 'CASCADE',
	onUpdate: 'NO ACTION',
});

module.exports = db;