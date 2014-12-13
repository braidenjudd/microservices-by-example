var amqp = require('amqp');
var _ = require('lodash');

var connection = amqp.createConnection({ url: 'amqp://192.168.59.103:5672' });

var solution_name = 'Enhanced Rental Offer';
var solution_type = 'ENHANCED';

var requires_solutions = function (solutions) {
	return solutions.length === 0;
};

var get_solutions = function (request) {
	return [{
		id: 1,
		name: solution_name, 
		price: 25, 
		type: solution_type 
	}];
};

connection.on('ready', function() {
    connection.exchange('eventms', { type: 'fanout', autoDelete: false }, function(exchange) {
    	connection.queue('tmp-' + Math.random(), {exclusive: true}, function(queue) {
            queue.bind('eventms', '');

            queue.subscribe(function(msg){
                var message = JSON.parse(msg.data);
                if (requires_solutions(message.solutions)) {
                	message.solutions = get_solutions(message.NEED);
            		exchange.publish('', JSON.stringify(message), {});
            		console.log('[x] Solution Published for :', message.id);
                }
            });
        })
    });
});