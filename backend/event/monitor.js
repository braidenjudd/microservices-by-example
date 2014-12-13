var amqp = require('amqp');
var connection = amqp.createConnection({ url: 'amqp://192.168.59.103:5672' });

connection.on('ready', function() {
    connection.exchange('eventms', {
    	type: 'fanout',
        autoDelete: false
    }, function(exchange) {
    	connection.queue('tmp-' + Math.random(), {exclusive: true}, function(queue) {
            queue.bind('eventms', '');
            console.log(' [*] Waiting for logs. To exit press CTRL+C')

            queue.subscribe(function(msg){
                console.log(" [x] %s", msg.data.toString('utf-8'));
            });
        })
    });
});