// Importations
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const postController = require('../controllers/post');


// Tous les posts
router.get('/', auth, postController.getAllPosts);

// Créer un nouveau post
router.post('/', auth, multer, postController.createPost);

// Supprimer un post
router.delete('/:id', auth, postController.deletePost);

module.exports = router;