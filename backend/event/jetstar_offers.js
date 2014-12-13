var amqp = require('amqp');
var connection = amqp.createConnection({ url: 'amqp://192.168.59.103:5672' });

var requires_solutions = function (request, solutions) {
    return solutions.length === 0 && !(request.full == true);
};

var get_solutions = function (request) {
    console.log(request);

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

connection.on('ready', function() {
    connection.exchange('eventms', { type: 'fanout', autoDelete: false }, function(exchange) {
        connection.queue('tmp-' + Math.random(), {exclusive: true}, function(queue) {
            queue.bind('eventms', '');

            queue.subscribe(function(msg){
                var message = JSON.parse(msg.data);
                if (requires_solutions(message.request, message.solutions)) {
                    message.solutions = get_solutions(message.request);
                    if (message.solutions.length > 0) {
                        exchange.publish('', JSON.stringify(message), {});
                        console.log('[x] Solutions offered for :', message.id);
                    }
                }
            });
        })
    });
});