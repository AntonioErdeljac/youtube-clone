const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const fileUpload = require('express-fileupload');

const routes = require('./routes');

const isProduction = process.env.NODE_ENV === 'production';


const app = express();

app.use(cors());
app.use(fileUpload());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'youtube-clone',
  cookie: {
    maxAge: 60000,
  },
  resave: false,
  saveUninitialized: false,
}));

if(!isProduction) {
  app.use(errorHandler());
}

app.use('/', routes());

require('./config/passport');

mongoose.connect('mongodb://localhost/youtube-clone');
mongoose.set('debug', true);

const server = app.listen(8000, () => {
  console.log('Listening on http://localhost:8000/');
});