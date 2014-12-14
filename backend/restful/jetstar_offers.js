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
    return !(request.full == true);
};

var get_solutions = function (request) {
    var solutions = [];

    if (request.start <= 8 && request.end >= 8) {
        solutions.push({
            cost: 89,
            description: "Basic Jetstar fare",
            aircraft: "A322",
            flight: "JQ866",
            logo: "jetstar.png",
            start: 8,
            end: 10
        });  
    }

    if (request.start <= 6 && request.end >= 6) {
        solutions.push({
            cost: 79,
            description: "Basic Jetstar fare",
            aircraft: "A322",
            flight: "JQ862",
            logo: "jetstar.png",
            start: 6,
            end: 8
        });  
    }

    return solutions;
};

// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 8085;

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
app.use('/jetstar_offers', router);

// start the server
app.listen(port);