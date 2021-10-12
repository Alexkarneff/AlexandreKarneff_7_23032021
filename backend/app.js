const express = require('express');
const path = require('path');
const db = require("./models");

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
  }

// Création App
const app = express();

db.sequelize.sync().then(result => {
	console.log(result);
}).catch( error =>  { console.log(error )});


// Cors
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH', 'OPTIONS');
	next();
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);



module.exports = app;