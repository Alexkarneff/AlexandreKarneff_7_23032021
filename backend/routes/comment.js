const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const commentController = require('../controllers/comment');


// Créer un commentaire
router.post('/', auth, commentController.addComment);

// Supprimer un commentaire
router.delete('/:id', auth, commentController.deleteComment);


module.exports = router;