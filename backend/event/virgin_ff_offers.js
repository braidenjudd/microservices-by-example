var amqp = require('amqp');
var connection = amqp.createConnection({ url: 'amqp://192.168.59.103:5672' });

var delay = function random (low, high) {
    return Math.round(Math.random() * (high - low) + low);
};

var requires_solutions = function (request, solutions) {
    return solutions.length === 0 && request.virgin == true;
};

var get_solutions = function (request) {
    console.log(request);

    var solutions = [];

    if (request.start <= 10 && request.end >= 10) {
        solutions.push({
            cost: 119,
            description: "Velocity Frequent Flyer",
            aircraft: "B738",
            flight: "VA828",
            logo: "virgin.gif",
            start: 10,
            end: 12
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