//get environment variables
require('dotenv').config();

// grab our dependencies
const express = require('express'),
  app = express(),
  port = process.env.PORT || 8000,
  expressLayouts = require('express-ejs-layouts'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  session=require('express-session'),
  cookieParser=require('cookie-parser'),
  flash=require('connect-flash'),
  expressValidator=require('express-validator'),
  db=require('./db');



// configure our application
//session and cookie
app.use(cookieParser());
app.use(session({
    secret:process.env.SECRET,
    cookie:{maxAge:60000},
    resave:false,
    saveUninitialized:false //dont save unmodified session
}));
app.use(flash());

// tell express where to look for static assets
app.use(express.static(__dirname + '/public'));


// set ejs as our templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

//body_parser init
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

// set the routes
app.use(require('./app/routes'));

//connect to database
mongoose.connect(db.url);



// start our server
app.listen(port, function() {
    console.log("App is running on port " + port);
});