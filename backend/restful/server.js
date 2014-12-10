var express = require('express');
var cors = require('cors');
var moment = require('moment');
var app = express();
var bodyParser = require('body-parser');

// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 8081;

// server setup
var router = express.Router();

// setup the routes
router.get('/', function(req, res) {
	res.json({ 
		offers: [
			{
				id: 1,
				cost: 49,
				description: "Platinum Offer",
				aircraft: "A388",
				flight: "QF8",
				logo: "qantas.png",
				start: moment(),
				end: moment()
			}, {
				id: 1,
				cost: 99,
				description: "Gold Offer",
				aircraft: "A388",
				flight: "QF8",
				logo: "qantas.png"
			}, {
				id: 1,
				cost: 49,
				description: "Platinum Offer",
				aircraft: "A322",
				flight: "QF8",
				logo: "tiger.gif"
			}, {
				id: 1,
				cost: 99,
				description: "Gold Offer",
				aircraft: "B738",
				flight: "QF8",
				logo: "virgin.gif"
			}, {
				id: 1,
				cost: 49,
				description: "Platinum Offer",
				aircraft: "B788",
				flight: "QF8",
				logo: "jetstar.png"
			}] 
	});	
});

// register the routes
app.use('/offers', router);

// start the server
app.listen(port);
console.log('http://localhost:' + port + '/offers');
