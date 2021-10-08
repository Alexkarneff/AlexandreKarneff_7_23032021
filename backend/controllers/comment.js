const db = require("../models/Comment");
const Comment = db.Comment;



exports.addComment = (req, res, next) => {
	const comment = {
		userId: req.body.userId,
		postId:	req.body.postId,
		content: req.body.content,
	};

	Comment.create(comment)
	.then(() => { 
		res.status(201).send(created);
	})
	.catch( error => res.status(500).send({ error, message: 'Impossible de créer un commentaire'} ));
};

exports.deleteComment = (req, res, next) => {
    commentId = req.params.id;

    Comment.destroy ({
        where : {id : commentId}
    })
};
