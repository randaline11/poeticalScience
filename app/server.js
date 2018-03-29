const poets = require('./services/poetRetrievalService');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const apiRouter = require('./router.js');
const constants = require('./constants/constants.js');
const BookController = require('./controllers/book_controller.js');
const axios = require('axios');

// DB Setup
// cosnole.log('poetical: ', process.env.POETICAL_DB_URL);
//const mongoURI = (process.env.POETICAL_DB_URL !== '') ? constants.mongoURI : 'mongodb://localhost/poetical';
const mongoURI = 'mongodb://localhost/poetical';
mongoose.connect(`${mongoURI}`); // /?ssl=true
// console.log('connected to mongo uri');
// set mongoose promises to es6 default
mongoose.Promise = global.Promise;

// initialize
const app = express();

// enable/disable cross origin resource sharing if necessary
app.use(cors());

app.set('view engine', 'ejs');
app.use(express.static('static'));
// enables static assets from folder static
app.set('views', path.join(__dirname, '../app/views'));
// this just allows us to render ejs from the ../app/views directory

// enable json message body for posting data to API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// default index route
app.get('/', (req, res) => {
  res.send('hi');
});

app.use('/api', apiRouter.router);

// START THE SERVER
// =============================================================================
const port = process.env.PORT || 9090;
app.listen(port);

console.log(`listening on: ${port}`);

const newBook = BookController.createBookLocal({ title: 'hi' })
  .then((book) => {
    console.log('book created: ', book);
  })
  .catch((err) => {
    console.log('error posting book: ', err);
  });

 poets.getPoets();
