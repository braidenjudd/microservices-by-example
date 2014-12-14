var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var Firebase = require("firebase");
var moment = require("moment");
var http = require('http');
var querystring = require('querystring');

// configure firebase
var firebaseURL = "https://ms-by-example.firebaseio.com/event-offers/"
var offersRef = new Firebase(firebaseURL);

// configure app
var port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// server setup
var router = express.Router();

// have a service catalog
var service_list = [
	"http://localhost:8082/qantas_offers", 
	"http://localhost:8083/virgin_offers", 
	"http://localhost:8084/tiger_offers", 
	"http://localhost:8085/jetstar_offers", 
	"http://localhost:8086/late_offers", 
	"http://localhost:8087/early_offers", 
	"http://localhost:8088/qantas_ff_offers", 
	"http://localhost:8089/virgin_ff_offers", 
];

// routes
router.post('/', function(req, res) {
	// Create a new key
	var offerList = offersRef.push({ });
	var offerListId = offerList.key();
	var offerListURL = firebaseURL + offerListId;

	// get all the data
	for (service_id in service_list) {
		get_data(service_list[service_id], offerListURL, req.body);	
	}

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

var get_data = function (URL, firebaseURL, request) {
	var params = querystring.stringify(request);
	var offerListRef = new Firebase(firebaseURL);

    http.get(URL + '?' + params, function(res) {
    	var data = '';

		res.on('data', function(chunk) {
			data += chunk;
		});

		res.on('end', function() {
			var solutions = JSON.parse(data).solutions;
			for (solution in solutions) {
				offerListRef.push(solutions[solution]);
			}
		});
	});
};
