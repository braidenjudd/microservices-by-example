var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var url = require('url');
var querystring = require('querystring');

var delay = function random (low, high) {
    return Math.round(Math.random() * (high - low) + low);
};

var get_solutions = function (request) {
    console.log(request);

    var solutions = [];

    if (request.start <= 6 && request.end >= 6) {
        solutions.push({
            cost: 159,
            description: "Basic Virgin fare",
            aircraft: "A388",
            flight: "VA841",
            logo: "virgin.gif",
            start: 6,
            end: 8
        });  
    }
    
    if (request.start <= 12 && request.end >= 12) {
        solutions.push({
            cost: 189,
            description: "Basic Virgin fare",
            aircraft: "B738",
            flight: "VA845",
            logo: "virgin.gif",
            start: 12,
            end: 14
        });  
    }

    if (request.start <= 20 && request.end >= 20) {
        solutions.push({
            cost: 119,
            description: "Basic Virgin fare",
            aircraft: "B738",
            flight: "VA849",
            logo: "virgin.gif",
            start: 20,
            end: 22
        });  
    }

    return solutions;
};

// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 8083;

// server setup
var router = express.Router();

router.get('/', function(req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    var solutions = get_solutions(query);

    var delay_time = delay(0, 6000);
    setTimeout(function() {
        res.status(200).json({
            solutions: solutions
        });
    }, delay_time);
});

// register the routes
app.use('/virgin_offers', router);

// start the server
app.listen(port);