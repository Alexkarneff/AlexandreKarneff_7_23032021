// Importations
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userController = require('../controllers/user');


// Inscription
router.post('/auth/signup', userController.signup);

// Connexion
router.post('/auth/login', userController.login);

// Suppression du compte
router.delete('/users/myaccount/:id', auth, userController.deleteAccount);



module.exports = router;