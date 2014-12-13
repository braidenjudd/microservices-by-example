var amqp = require('amqp');
var connection = amqp.createConnection({ url: 'amqp://192.168.59.103:5672' });
var Firebase = require("firebase");

// configure firebase
var firebaseURL = "https://ms-by-example.firebaseio.com/event-offers/"
var offersRef = new Firebase(firebaseURL);

connection.on('ready', function() {
    connection.exchange('eventms', { type: 'fanout', autoDelete: false }, function(exchange) {
    	connection.queue('tmp-' + Math.random(), {exclusive: true}, function(queue) {
            queue.bind('eventms', '');

            queue.subscribe(function(msg) {

            	var message = JSON.parse(msg.data);
            	var offerListRef = new Firebase(message.url);

            	for (solution in message.solutions) {
            		console.log("[X] Solution Published: ", message.solutions[solution]);
            		offerListRef.push(message.solutions[solution]);
            	}
            });
        })
    });
});