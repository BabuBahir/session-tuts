var express = require('express'),
    app = express(),
    session = require('express-session');
	var bodyParser = require('body-parser');
	
	app.use(session({
		secret: '2C44-4D44-WppQ38S',
		resave: true,
		saveUninitialized: true
	}));
	 
// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if (req.session && req.session.user === "amy" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};

 //index.html
app.get('/', function(req, res) {
   res.sendFile('views/index.html', { root: __dirname });
});
 
 app.use(bodyParser.urlencoded({
    extended: true
}));

	app.use(bodyParser.json());

// Login endpoint
	app.post('/login', function (req, res) {
		console.log(req.body);
	if (!req.body.username || !req.body.password) {
		res.send('login failed');    
	} else if(req.body.username === "amy" || req.body.password === "amyspassword") {
		req.session.user = "amy";
		req.session.admin = true;
		res.send("login success! <br/> <a href='/logout'>Click to Logout</a> "+auth);
	}
});
 
// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.sendFile('views/index.html', { root: __dirname });
});
 
// Get content endpoint
app.get('/content', auth, function (req, res) {
    res.send("You can only see this after you've logged in.<br/> "+req.session.user);
});
 
app.listen(3000);
console.log("app running at http://localhost:3000");