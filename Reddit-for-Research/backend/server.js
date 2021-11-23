let express = require('express'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  dbConfig = require('./database/db');


// Routes to Handle Request
const documentRoute = require('../backend/routes/document.route')
const annotationRoute = require('../backend/routes/annotation.route')
const searchRoute = require('../backend/routes/search.route')
const loginRoute = require('../backend/routes/login.route')
const registerRoute = require('../backend/routes/register.route')


// MongoDB Setup
mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true
}).then(() => {
  console.log('Database sucessfully connected')
},
  error => {
    console.log('Database could not be connected: ' + error)
  }
)


// Setup Express.js
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());


// Make Images "Uploads" Folder Publicly Available
app.use('/public', express.static('public'));


// API Route
app.use('/document', documentRoute)
app.use('/annotation', annotationRoute)
app.use('/search', searchRoute)
app.use('/login', loginRoute)
app.use('/register', registerRoute)


// Error favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204));

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Error
app.use((req, res, next) => {
  // Error goes via `next()` method
  setImmediate(() => {
    next(new Error('Something went wrong'));
  });
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
