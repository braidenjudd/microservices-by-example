var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var Firebase = require("firebase");
var moment = require("moment");
var amqp = require('amqp');

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

router.post('/', function(req, res) {
	// Create a new key
	var offerList = offersRef.push({ });
	var offerListId = offerList.key();
	var offerListURL = firebaseURL + offerListId;

	console.log(req.body);

	// Post a request to the queue
	var connection = amqp.createConnection({ url: 'amqp://192.168.59.103:5672' });
	connection.on('ready', function () {
		connection.exchange('eventms', options={type:'fanout', autoDelete: false}, function(exchange) { 
	      	var flight_offer_request = {
	      		request: req.body,
		  		solutions: [],
		  		id: offerListId,
		  		url: offerListURL,
		  		timeout: 10000
	  		};

	  		console.log('[o] Requesting need for: ', flight_offer_request.id);
	      	exchange.publish('', JSON.stringify(flight_offer_request), {});
	 	});
	});

	// Set the location header
	res.status(201).json({ 
		offerListURL: offerListURL
	});
});

// register the routes
app.use('/offers', router);

// start the server
app.listen(port);
console.log('http://localhost:' + port + '/offers');
