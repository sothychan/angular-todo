var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
// var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
var db = require('./config/database');
// // configure database bindings for MariaDB via Bookshelf + Knex
// var dbConfig = require('./config/knexfile');
// var knex = require('knex')(dbConfig[environment.development ? 'development' : 'staging']);
// var Bookshelf = require('bookshelf')(knex);

// // sessions and authentication support
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var BearerStrategy = require('passport-http-bearer').Strategy;

/**
 * create application instance
 * @type {Object}
 */

var app = express();

mongoose.connect(db.url);
// define all of the middleware for the express stack.
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.json());                                     // parse application/json
app.use(methodOverride());
app.set('trust proxy', 1); // trust first proxy

// walk through the models and routes directory and require all

// var User = require('./models/user')(app, Bookshelf);

// passport.use(new LocalStrategy(function (username, password, done) {
//     new User({email: username}).fetch().then(function (model) {
//         if (!model) {
//             return done(null, false, {message: 'no user found'});
//         } else {
//             bcrypt.compare(password, model.get('userSalt'), function (err, res) {
//                 if (res = true) {
//                     return done(null, model);
//                 } else {
//                     return done(null, false, {message: 'no user found'});
//                 }
//             });
//         }
//     });
// }));

// passport.use(new BearerStrategy(function (token, done) {
//   new User({userSalt: token}).fetch().then(function (model) {
//     if (model) {
//       return done(null, model);
//     } else {
//       return done(null, false);
//     }
//   });
// }));



// configure passport specific stuff.
// passport.serializeUser(function (user, done) {
//     done(null, user.get('userSalt'));
// });

// passport.deserializeUser(function (id, done) {
//     new User({userSalt: id}).fetch().then(function (record) {
//         done(null, record);
//     });
// });



// configure our logger to use morgan's combined stream logger to ./access.log
app.use(morgan('combined', {stream: accessLogStream}));

// mount up the express path to static files
// app.use(express.static(path.join(__dirname, '../app/dist')));

// configure view engine for jade templates in ./templates
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'jade');

// allow CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

/** Routes! */
var Router = express.Router();
app.use(Router);
// automatically walk the routes/ directory and configure all of the routes.
require('./router')(app, mongoose, Router);


app.listen(3000, function () {
    console.log('server running.');
});

module.exports = {
    app: app
};