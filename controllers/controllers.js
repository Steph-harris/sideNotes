var express = require('express');
var router = express.Router();

//requiring passport last
var passport = require('passport');
var passportLocal = require('passport-local');
//requiring bcrypt, hashes passwords
var bcrypt = require("bcryptjs");
//requiring bodyParser and initializing for use
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: false
}));
//get css,js, or images from files in public folder
router.use('/scripts', express.static('public/scripts'));
router.use('/css', express.static('public/css'));
router.use('/img', express.static('public/img'));
router.use('/semantic', express.static('semantic'));
//Initializing and requiring middleware express-session, enabaling cookies
router.use(require('express-session')({
  secret:'HELLO WORLD',
  resave: true,
  saveUninitialized: true,
  cookie: {secure: false, maxAge : (1000 * 60 * 60 * 24 * 14)},
}));

/************* PASSPORT CODE START *************/
//Initializing passport.
router.use(passport.initialize());
router.use(passport.session());

//************* EXPRESS HANDLEBARS CODE STARTS HERE *************/
router.get("/", function(req, res){
  res.render("index");
});

router.post("/signin", function(req, res){
  console.log(req.body);
  res.send("signed in");
});

router.post("/register", function(req, res){
  debugger;
  console.log(req.body);
  User.create(req.body).then(function(result){
    res.redirect('/?msg=Successfully created account please login');
  }).catch(function(err) {
    console.log(err);
    res.redirect('/?msg='+ "E-mail " + err.errors[0].message);
  });
});

//error handlers
router.use(function(req, res, next) {
  var err = new Error('404 Not Found');
  err.status = 404;
  next(err);
});
//catch 404 and forward to error handler
if (router.get('env') === 'development') {
  router.use(function(err, req, res, next) {
    res.status(err.status || 500);
     res.render('error', {
      message: err.message,
      error: err
    });
  });
}

module.exports = router;
