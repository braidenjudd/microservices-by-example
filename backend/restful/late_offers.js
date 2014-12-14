var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var url = require('url');
var querystring = require('querystring');

var delay = function random (low, high) {
    return Math.round(Math.random() * (high - low) + low);
};

var requires_solutions = function (request) {
    return request.start <= 22 && request.end >= 22;
};

var get_solutions = function (request) {
    var solutions = [];

    if (request.start <= 22 && request.end >= 22) {
        solutions.push({
            cost: 109,
            description: "Late FlightMasher fare",
            aircraft: "B738",
            flight: "QF668",
            logo: "qantas.png",
            start: 22,
            end: 24
        });  
    }
    
    if (request.start <= 22 && request.end >= 22) {
        solutions.push({
            cost: 109,
            description: "Late FlightMasher fare",
            aircraft: "B738",
            flight: "VA880",
            logo: "virgin.gif",
            start: 22,
            end: 24
        });  
    }

    return solutions;
};


// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 8086;

// server setup
var router = express.Router();

router.get('/', function(req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    var solutions = requires_solutions(query) ? get_solutions(query) : [];

    var delay_time = delay(0, 6000);
    setTimeout(function() {
        res.status(200).json({
            solutions: solutions
        });
    }, delay_time);
});

// register the routes
app.use('/late_offers', router);

// start the server
app.listen(port);