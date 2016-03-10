//express setup
var express = require('express');
var app = express();
// //require (dotenv)
// require('dotenv').config();
var PORT = process.env.PORT || 8080;
//Sequelize database setup
// var Sequelize = require('sequelize');
// //  "testdb1", "root", ""
// var connection = new Sequelize(process.env.JAWSDB_URL);
//requiring passport last
var passport = require('passport');
var passportLocal = require('passport-local');
//requiring bcrypt, hashes passwords
var bcrypt = require("bcryptjs");
//requiring bodyParser and initializing for use
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));
//get css,js, or images from files in public folder
app.use('/scripts', express.static('public/scripts'));
app.use('/css', express.static('public/css'));
app.use('/img', express.static('public/img'));
app.use('/semantic', express.static('semantic'));
//Initializing and requiring middleware express-session, enabaling cookies
app.use(require('express-session')({
  secret:'HELLO WORLD',
  resave: true,
  saveUninitialized: true,
  cookie: {secure: false, maxAge : (1000 * 60 * 60 * 24 * 14)},
}));
//Setting up and requring Handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');


/************* PASSPORT CODE START *************/
//Initializing passport.
app.use(passport.initialize());
app.use(passport.session());

//************* EXPRESS HANDLEBARS CODE STARTS HERE *************/
app.get("/", function(req, res){
  res.render("index");
});

//error handlers
app.use(function(req, res, next) {
  var err = new Error('404 Not Found');
  err.status = 404;
  next(err);
});
//catch 404 and forward to error handler
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
     res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// database connection via sequelize
// connection.sync({}).then(function() {
  app.listen(PORT, function() {
    console.log("Listening on port %s", PORT);
  });
// });
