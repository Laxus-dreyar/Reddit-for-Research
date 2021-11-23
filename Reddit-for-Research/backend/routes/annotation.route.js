let express = require('express'),
    router = express.Router();

let Annotation = require('../models/Annotation')
request = require('request');

let token = "6879-3KKnn_K-msSXwxDd0hBr_9nGpXyn31S7rUCZ06SnmD8"
let user = 'shanmukh1608'

// API to retrieve annotations for particular user in database, store in database, and print
router.get("/", (req, res, next) => {
    const options = {
        url: 'https://hypothes.is/api/search?user=' + user,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        },
        json: true
    }

    request.get(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            for (i = 0; i < body.total; i++) {
                let annotation = new Annotation(body.rows[i])
                annotation.save()
                    .then(annotation => {
                        console.log("Saved annotation ID: " + annotation.id)
                    })
                    .catch(err => {
                        if (err.code == 11000)
                            console.log("Annotation ID: " + annotation.id + ": Duplicate entry, not writing")
                        else
                            console.log(err)
                    })
            }
            res.status(200).json(body)
        }
        else {
            res.status(response.statusCode).json({ 'error': error })
        }
    });
});

// API to create annotation in Hypothes.is backend as well as our database
router.post("/create", (req, res, next) => {

    const options = {
        url: 'https://api.hypothes.is/api/annotations',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        },
        json: true,
        body: req.body
    }

    request.post(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let annotation = new Annotation(body)
            annotation.save()
                .then(annotation => {
                    console.log("Saved annotation ID: " + annotation.id)
                })
                .catch(err => {
                    console.log(err)
                })

            res.status(200).json(body)
        }
        else {
            res.status(response.statusCode).json({ 'error': error })
        }
    });
})

// API to delete annotation in Hypothes.is backend as well as our database
router.delete("/delete", (req, res, next) => {

    const options = {
        url: 'https://api.hypothes.is/api/annotations/' + req.body.id,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        },
        json: true
    }


    Annotation.deleteOne({ id: req.body.id }, function (err) {
        if (!err) {
            console.log("Deleted " + req.body.id + " from database!")
            request.delete(options, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    console.log("Deleted " + req.body.id + " from Hypothes.is!")
                    res.status(200).json(body)
                }
                else
                {
                    res.status(response.statusCode).json({ 'error': error })
                }
            })
        }
        else {
            console.log("Failed to delete " + req.body.id + " from database")
            res.status(400).json({ 'deleted': false, 'id': req.body.id })
        }
    })
})

module.exports = router;