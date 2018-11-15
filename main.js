'use strict';

let express = require('express'),
	cookieParser = require('cookie-parser'),
	expressSession = require('express-session'),
	passport = require('passport'),
	request = require('request'),
	app = express();

const userDatabase = require('./resources/js/userDatabase.js');



app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({
	extended: true
})); // for parsing application/x-www-form-urlencoded

// Setup Cookie Parser to parse our cookies, we won't really be using cookies,
// but we will be using a cookie for login
app.use(cookieParser());

// Setup session handling
// Always do express-session config first
app.use(expressSession({
	secret: 'youshallnotpass',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
	cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
	cb(null, obj);
	userDatabase.addUser(obj);
});

app.use(express.static('resources'));

app.get('/', function (req, res) {
	res.render('home');
});

app.get('/resume', function (req, res) {
	res.render('resume');
});

const server = app.listen(3000, function () {
	console.log(`Started server on port ${server.address().port}`);
});