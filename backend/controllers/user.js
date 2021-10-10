const db = require("../models");
const User = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

exports.signup = (req, res, next) => {
    console.log(req.body);
    bcrypt
    //hash du mot de passe
        .hash(req.body.password, 10)
        .then((hash) => {
            User
                .create({
                    email: req.body.email,
                    password: hash,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    admin: req.body.admin,
                })
                .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error })
        });
};

exports.login = (req, res, next) => {
    
    User.findOne({ where: { email: req.body.email } })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: "Utilisateur non trouvé !" });
            }
            //on compare le hash pour vérifier le mot de passe
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe incorrect !" });
                    }
                    res.status(200).json({
                        user: {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: req.body.email,
                            password: req.body.password,
                            description: user.description,
                            admin: user.admin,
                        },
                        token: jwt.sign({ id: user._id }, "RANDOM_TOKEN_SECRET", {
                            expiresIn: "24h",
                        }),
                        message: "Vous êtes connecté!"
                    });
                    console.log(user);
                })
                
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.deleteAccount = (req, res, next) => {
    const userId = req.params.id;

    User.destroy({
            where: { id: userId },
        })
        .then(() => {
            res.status(200).send({ message: "Suppression du compte effectuée " });
        })
        .catch((error) => {
            res
                .status(500)
                .send({ error, message: "Erreur lors de la suppression du compte" });
        });
};