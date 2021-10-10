const db = require("../models/Post");
const Post = db.Post;

exports.createPost = (req, res, next) => {
	console.log(req.body);
	// Valid request
	if (!req.body.title) {
		res.status(400).send({
		  message: "Pas de titre au post"
		});
		return
	}

	if (req.file) {
		const post = {
			userId : req.body.id,
			title : req.body.title,
			content : req.body.content,
			postDate : Date.now(),
			likes: 0,
			imageURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
		};
		Post.create(post)
		.then(() => res.status(201).json({ message: 'Post créé !'}))
		.catch( error => res.status(500).send({ error, message: 'Impossible de créer le post'} ));
		
	} else {
		const post = {
			userId : req.body.id,
			title : req.body.title,
			content : req.body.content,
			postDate : Date.now(),
			likes: 0,
			imageURL: null
		};
        Post.create(post)
		.then(() => res.status(201).json({ message: 'Post créé !'}))
		.catch( error => res.status(500).send({ error, message: 'Impossible de créer le post'} ));
		
	};
};

exports.getAllPosts = (req, res, next) => {

};

exports.getPost = (req, res, next) => {

};

exports.deletePost = (req, res, next) => {
    const postId = req.params.id;

    Post.destroy ({
        where: {postId : id}
    })
};

exports.likePost = (req, res, next) => {

};