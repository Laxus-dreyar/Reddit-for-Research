const router = require('express').Router();

let User = require('../models/User');

router.route('/').post(function (req, res) {
    let user = new User(req.body);
    User.findOne({ username: req.body.username }, function (err, result) {
        if (!result) {
            user.save()
                .then(user => {
                    return res.status(200).json({ 'User': 'User added successfully' });
                })
        }
        else
            return res.status(409).send("User exists")

    });
});

router.route('/').get(function (req, res) {
    User.find(function (err, users) {
        if (err)
            return res.sendStatus(503);
        if (!users) 
            return res.sendStatus(404);
        else
            return res.status(200).json(users)
    }
    )
})

router.route('/userDetails').post(function (req, res) {
    User.findOne({ username: req.body.username},function (err, user) {
        if (err)
            return res.sendStatus(503);
        if (!user) 
            return res.sendStatus(404);
        else
            return res.status(200).json(user)
    }
    )
})

module.exports = router;