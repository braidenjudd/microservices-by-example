    var amqp = require('amqp');
var _ = require('lodash');

var connection = amqp.createConnection({ url: 'amqp://192.168.59.103:5672' });

var delay = function random (low, high) {
    return Math.round(Math.random() * (high - low) + low);
};

var requires_solutions = function (solutions) {
	return solutions.length === 0;
};

var get_solutions = function (request) {
	console.log(request);

    var solutions = [];

    if (request.start <= 6 && request.end >= 6) {
        solutions.push({
            cost: 169,
            description: "Basic QANTAS fare",
            aircraft: "A388",
            flight: "QF610",
            logo: "qantas.png",
            start: 6,
            end: 8
        });  
    }
    
    if (request.start <= 12 && request.end >= 12) {
        solutions.push({
            cost: 199,
            description: "Basic QANTAS fare",
            aircraft: "A388",
            flight: "QF618",
            logo: "qantas.png",
            start: 12,
            end: 14
        });  
    }

	if (request.start <= 20 && request.end >= 20) {
        solutions.push({
            cost: 129,
            description: "Basic QANTAS fare",
            aircraft: "A388",
            flight: "QF616",
            logo: "qantas.png",
            start: 20,
            end: 22
        });  
    }

    return solutions;
};

connection.on('ready', function() {
    connection.exchange('eventms', { type: 'fanout', autoDelete: false }, function(exchange) {
    	connection.queue('tmp-' + Math.random(), {exclusive: true}, function(queue) {
            queue.bind('eventms', '');

            queue.subscribe(function(msg){
                var message = JSON.parse(msg.data);
                if (requires_solutions(message.solutions)) {
                    message.solutions = get_solutions(message.request);
                    if (message.solutions.length > 0) {
                		var delay_time = delay(0, 6000);
                        setTimeout(function() {
                            exchange.publish('', JSON.stringify(message), {});
                            console.log('[x] Solutions offered for :', message.id);
                        }, delay_time);
                    }
                }
            });
        })
    });
});