const db = require("../models");
const Post = db.post;
const User = db.user;

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
            userId: req.body.id,
            title: req.body.title,
            text: req.body.content,
            postDate: Date.now(),
            likes: 0,
            imageURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        };
        Post.create(post)
            .then(() => res.status(201).json({ message: 'Post créé !' }))
            .catch(error => res.status(500).send({ error, message: 'Impossible de créer le post' }));

    } else {
        const post = {
            userId: req.body.id,
            title: req.body.title,
            text: req.body.content,
            postDate: Date.now(),
            likes: 0,
            imageURL: null
        };
        sendPostToDB(post).then(newPost => res.status(201).json({ newPost }));
    };
};

async function sendPostToDB(post) {
    try {
        let result = await Post.create(post);
        let newpost = await getPost(result.dataValues.id);
        return newpost;
    } catch (error) {
        console.log(error);
    }
}

exports.getAllPosts = (req, res, next) => {
    Post.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            attributes: {
                exclude: ['updatedAt']
            },
            include: [{
                model: User,
                attributes: ['firstName', 'lastName']
            }, ]
        }).then((posts) => {
            res.status(200).json(posts);
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};

exports.getPost = (req, res, next) => {

};

exports.deletePost = (req, res, next) => {
    const postId = req.params.id;

    Post.destroy({
        where: { postId: id }
    })
};

exports.likePost = (req, res, next) => {

};