'use strict';

let express = require('express'),
	cookieParser = require('cookie-parser'),
	expressSession = require('express-session'),
	passport = require('passport'),
	TwitterStrategy = require('passport-twitter').Strategy,
	request = require('request'),
	app = express(),
	key = 'L7ApFjr9zVALVr9J0Oq4G0BFo',
	secret = 'JSLPrWo1NaCkxRRWTykckKUKkSXDDpc89h3PFDkihpjMbL4XpP',
	url = 'https://api.twitter.com/1.1/search/tweets.json';

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

passport.use(new TwitterStrategy({
	consumerKey: key,
	consumerSecret: secret,
	callbackURL: '/twlogin/callback'
},
	function (token, tokenSecret, profile, cb) {
		return cb(null, profile);
	}
));


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

app.get('/twlogin', passport.authenticate('twitter'));

app.get('/twlogin/callback',
	passport.authenticate('twitter', { failureRedirect: '/', successRedirect: '/twitter' }
	));

app.get('/twitter', function (req, res) {
	if (req.isAuthenticated()) {
		let bearer = 'AAAAAAAAAAAAAAAAAAAAACxK3QAAAAAAESYICIQOczYA%2FaqfKRrYETndQVc%3DpfZXsG7ZThVO7yuj7U9gNpgTkMjirp1d6khx5uPsJ5IyZioxD7';
		request({
			url: url,
			method: 'GET',
			json: true,
			qs: {
				'q': 'CSC365',
				'count': 10,
			},
			headers: {
				'Authorization': 'Bearer ' + bearer,
			},

		}, function (err, resp, body) {
			console.log(body.statuses[0].text);
			res.render('twitter', body);
		});
	} else {
		res.redirect('/twlogin');
	}

});

const server = app.listen(3000, function () {
	console.log(`Started server on port ${server.address().port}`);
});