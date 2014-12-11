var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var Firebase = require("firebase");
var moment = require("moment");


// configure firebase
var firebaseURL = "https://ms-by-example.firebaseio.com/event-offers/"
var offersRef = new Firebase(firebaseURL);

// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 8080;

// server setup
var router = express.Router();

// setup the routes
router.get('/', function(req, res) {

	// Create a new key
	var offerList = offersRef.push({ });
	var offerListId = offerList.key();
	var offerListURL = firebaseURL + offerListId;

	// TODO: Remove this, this will be done by the microservices
	var offerListRef = new Firebase(offerListURL);

	offerListRef.push({
		cost: 49,
		description: "Platinum Offer",
		aircraft: "A388",
		flight: "QF8",
		logo: "qantas.png"
	});

	offerListRef.push({
		cost: 99,
		description: "Gold Offer",
		aircraft: "A388",
		flight: "QF8",
		logo: "qantas.png"
	});

	offerListRef.push({
		cost: 49,
		description: "Platinum Offer",
		aircraft: "A388",
		flight: "QF8",
		logo: "qantas.png"
	});

	offerListRef.push({
		id: 1,
		cost: 49,
		description: "Platinum Offer",
		aircraft: "A322",
		flight: "QF8",
		logo: "tiger.gif"
	});

	offerListRef.push({
		id: 1,
		cost: 99,
		description: "Gold Offer",
		aircraft: "B738",
		flight: "QF8",
		logo: "virgin.gif"
	});

	offerListRef.push({
		id: 1,
		cost: 49,
		description: "Platinum Offer",
		aircraft: "B788",
		flight: "QF8",
		logo: "jetstar.png"
	});

	res.json({ 
		offerListURL: offerListURL
	});	
});

// register the routes
app.use('/offers', router);

// start the server
app.listen(port);
console.log('http://localhost:' + port + '/offers');
