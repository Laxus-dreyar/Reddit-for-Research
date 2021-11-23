let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    router = express.Router();

// Multer File upload settings
const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});

// Multer Mime Type Validation
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 50,
        fieldSize: 1024 * 1024 * 50
    },

});


// Document model
let Document = require('../models/Document');

// POST Document
router.post('/add-document', upload.single('link'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const document = new Document({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        author: req.body.author,
        yearofpublish: req.body.yearofpublish,
        field: req.body.field,
        link: url + '/public/' + req.file.filename,
        uploadedby: req.body.uploadedby
    });

    document.save().then(result => {
        res.status(201).json({
            message: "Document registered successfully!",
            DocumentCreated: {
                _id: result._id,
                name: result.name,
                author: result.author,
                yearofpublish: result.yearofpublish,
                field: result.field,
                link: result.link
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})

// GET All Documents
router.get("/", (req, res, next) => {
    Document.find().sort({ _id: -1 }).then(data => {
        res.status(200).json({
            message: "Documents retrieved successfully!",
            documents: data
        });
    });
});


module.exports = router;
