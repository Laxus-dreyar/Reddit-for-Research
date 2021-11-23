const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Schema
let annotationSchema = new Schema({
  id: {
    type: String,
    unique: true
  },
  created: Date,
  updated: Date,
  user: String,
  uri: String,
  text: String,
  tags: Array,
  group: String,
  permissions: {
    read: Array,
    admin: Array,
    update: Array,
    delete: Array
  },
  target: [{
    source: String,
    selector: Array
  }],
  document: {
    title: Array
  },
  links: {
    html: String,
    incontext: String,
    json: String
  },
  flagged: Boolean,
  hidden: Boolean,
  user_info: {
    display_name: String
  }
}, {
  collection: 'annotations'
})

module.exports = mongoose.model('Annotation', annotationSchema)
