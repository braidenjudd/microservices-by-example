var amqp = require('amqp');
var _ = require('lodash');

var connection = amqp.createConnection({ url: 'amqp://192.168.59.103:5672' });

var solution_name = 'Enhanced Rental Offer';
var solution_type = 'ENHANCED';

var requires_solutions = function (solutions) {
	return solutions.length === 0;
};

var get_solutions = function (request) {
	console.log(request);

	return [{
        cost: 199,
        description: "Basic QANTAS fare",
        aircraft: "A388",
        flight: "QF8",
        logo: "qantas.png",
        start: 6,
        end: 8
    }, {
        cost: 99,
        description: "Basic QANTAS fare",
        aircraft: "A388",
        flight: "QF9",
        logo: "qantas.png",
        start: 12,
        end: 14
    }, {
        cost: 49,
        description: "Basic QANTAS fare",
        aircraft: "A388",
        flight: "QF10",
        logo: "qantas.png",
        start: 20,
        end: 22
    }];
};

connection.on('ready', function() {
    connection.exchange('eventms', { type: 'fanout', autoDelete: false }, function(exchange) {
    	connection.queue('tmp-' + Math.random(), {exclusive: true}, function(queue) {
            queue.bind('eventms', '');

            queue.subscribe(function(msg){
                var message = JSON.parse(msg.data);
                if (requires_solutions(message.solutions)) {
                	message.solutions = get_solutions(message);
            		exchange.publish('', JSON.stringify(message), {});
            		console.log('[x] Solution offered for :', message.id);
                }
            });
        })
    });
});