//get environment variables
require('dotenv').config();

// grab our dependencies
const express = require('express'),
  app = express(),
  expressLayouts = require('express-ejs-layouts'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  session=require('express-session'),
  cookieParser=require('cookie-parser'),
  flash=require('connect-flash'),
  expressValidator=require('express-validator');


// tell express where to look for static assets
app.use(express.static(__dirname + '/public'));

app.set( 'port', ( process.env.PORT || 3000 ));

// configure our application
//session and cookie
app.use(cookieParser(process.env.SECRET));
app.use(session({
    secret:process.env.SECRET,
    cookie:{maxAge:60000},
    resave:false,
    saveUninitialized:false //dont save unmodified session
}));
app.use(flash());

//connect to database
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOHQ_URL || process.env.MONGOLAB_URI);



// set ejs as our templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

//body_parser init
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

// set the routes
app.use(require('./app/routes'));


// start our server
app.listen( app.get( 'port' ), function() {
    console.log( 'Node server is running on port ' + app.get( 'port' ));
});