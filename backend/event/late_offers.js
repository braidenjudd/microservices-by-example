var amqp = require('amqp');
var _ = require('lodash');

var connection = amqp.createConnection({ url: 'amqp://192.168.59.103:5672' });

var delay = function random (low, high) {
    return Math.round(Math.random() * (high - low) + low);
};

var requires_solutions = function (request, solutions) {
    return solutions.length === 0 && request.start <= 22 && request.end >= 22;
};

var get_solutions = function (request) {
    console.log(request);

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

connection.on('ready', function() {
    connection.exchange('eventms', { type: 'fanout', autoDelete: false }, function(exchange) {
        connection.queue('tmp-' + Math.random(), {exclusive: true}, function(queue) {
            queue.bind('eventms', '');

            queue.subscribe(function(msg){
                var message = JSON.parse(msg.data);
                if (requires_solutions(message.request, message.solutions)) {
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