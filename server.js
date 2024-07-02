var express = require('express');
var env = require('dotenv').config()
var ejs = require('ejs');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');

const config = require('./config.json')

app.use(session({
  secret: 'work harder',
  resave: true,
  saveUninitialized: false,
}));

app.use(flash());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views'));

var index = require('./routes/index');
app.use('/', index);

app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

const PORT = config.server.port || 3000;
app.listen(PORT, function () {
  console.log('Server is started on http://127.0.0.1:' + PORT);
});
