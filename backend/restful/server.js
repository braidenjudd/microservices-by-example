var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// server setup
var router = express.Router();

// setup the routes
router.get('/', function(req, res) {
	res.json({ 
		offers: [{
			"offer1": {
				id: 1,
				cost: 49,
				description: "Platinum Offer"
			}, "offer2": {
				id: 1,
				cost: 99,
				description: "Gold Offer"
			}
		}] 
	});	
});

// register the routes
app.use('/offers', router);

// start the server
app.listen(port);
console.log('http://localhost:' + port + '/offers');
