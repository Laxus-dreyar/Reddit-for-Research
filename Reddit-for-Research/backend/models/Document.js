const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Schema
let documentSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        trim: true
    },
    yearofpublish: {
        type: Number
    },
    field: {
        type: String,
        trim: true
    },
    link: {
        type: String,
        trim: true
    },
    uploadedby: {
        type: String,
        trim: true
    }
}, {
    collection: 'documents'
})

module.exports = mongoose.model('Document', documentSchema)