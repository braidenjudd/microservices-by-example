Microservices by Example
========================

This repository shows a simple example of an offer generation system. This is implemented using both RESTful and Eventing styles of microservice architecture.

## The Brief

As a consumer I want to receive the best flight offers between Melbourne and Brisbane available to me. These offers should be personalised depending on my preferences. I can enter the following preferences

 - Collect name and email - for marketing spam
 - Level of Service (Full/Budget)
 - If they are frequent flier
 - Time of day

## The Implementations

### Eventing

![Alt text](http://web.pragmaticyclist.io.s3-website-ap-southeast-2.amazonaws.com/img/event_ms_arch.png)

### Restful

![Alt text](http://web.pragmaticyclist.io.s3-website-ap-southeast-2.amazonaws.com/img/restful_ms_arch.png)

## Running the app

### Requirements
- http://nodejs.org/
- sudo npm install -g bower
- boot2docker

### Get all the dependencies
- cd ./frontend && bower install
- cd .. && cd ./backend/event && npm install
- cd ../.. && ./backend/restful && npm install

### Make sure docker is up and running
- boot2docker start
- export DOCKER_HOST=tcp://192.168.59.103:2376
- export DOCKER_CERT_PATH=/Users/braiden.judd/.boot2docker/certs/boot2docker-vm
- export DOCKER_TLS_VERIFY=1

### Start the two backends (you may have to chmod 700 the scripts)
- ./backend/event/startEvent.sh
- ./backend/event/startEvent.sh

### Host the frontend folder (you need to run a bower install first)
- cd ./frontend && python -m "SimpleHTTPServer"

NOTE: You might need to change the IP in the services for event to your boot2docker ip. Use the command `boot2docker ip` to find your IP.