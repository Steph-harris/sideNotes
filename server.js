//express setup
var express = require('express');
var app = express();
// //require (dotenv)
// require('dotenv').config();
//Setting up and requring Handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

var sequelize = require("./config/connection.js");

var PORT = process.env.PORT || 8080;

var routes = require("./controllers/controllers.js");
app.use(routes);

// database connection via sequelize
sequelize.sync({}).then(function() {
  app.listen(PORT, function() {
    console.log("Listening on port %s", PORT);
  });
});
