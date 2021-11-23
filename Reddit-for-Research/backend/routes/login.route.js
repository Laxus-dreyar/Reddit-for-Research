const router = require('express').Router();
const jwt = require('jsonwebtoken');

let User = require('../models/User');

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

router.route('/').post(async function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    await User.findOne({ username: username }, function (err, user) {
        if (err) return res.sendStatus(503);
        if (!user)
            return res.sendStatus(401);

        user.comparePasswords(password, function (err, match) {
            if (err) return res.sendStatus(503);
            if (match) {
                // User is verified
                jwt.sign({ user }, 'secretkey', (err, token) => {
                    res.status(200).json({
                        token
                    });
                })
            } else {
                return res.sendStatus(401)
            }
        });

    });
});

router.route('/check').get(verifyToken, function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) return res.status(500).json({ "Error": "Authentication failed" })
        else {
            User.findOne({ username: authData.user.username }).lean().exec(function (err, user) {
                if (err) return res.status(503)
                if (!user) return res.status(401)

                return res.status(200).send(user)
            })
        }
    })
});


module.exports = router;