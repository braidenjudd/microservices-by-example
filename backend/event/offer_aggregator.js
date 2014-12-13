var amqp = require('amqp');
var uuid = require('uuid');
var connection = amqp.createConnection({ url: 'amqp://192.168.59.103:5672' });

connection.on('ready', function () {
	connection.exchange('', options={type:'fanout', passive: true}, function(exchange) { 
      	var test_message = { 
	      	need: 'car_rental_offer',
	  		solutions: [],
	  		json_class: 'com.microservices.rentaloffer.NeedPacket',
	  		id: uuid.v4(),
	  		timeout: 10000
  		};

  		console.log('[o] Requesting need for: ', test_message.id);
      	exchange.publish('', JSON.stringify(test_message), {});
 	})
})