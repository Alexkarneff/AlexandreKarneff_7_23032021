const db = require("../models");
const Comment = db.comment;


// Ajout de commentaire
exports.addComment = (req, res, next) => {
	let created=false;
	const comment = {
		userId: req.body.userId,
		postId:	req.body.postId,
		content: req.body.content,
	};

	Comment.create(comment)
	.then(() => { 
		created=true;
		res.status(201).send(created);
	})
	.catch( error => res.status(500).send({ error, message: 'Impossible de créer un commentaire'} ));
};

// Suppression de commentaire
exports.deleteComment = (req, res, next) => {
    const commentId = req.params.id;
        Comment.destroy({where: { id: commentId }})
		.then(() => res.status(200).json({ message: "Comment supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
};
