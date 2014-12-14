Microservices by Example
========================

This repository shows a simple example of an offer generation system. This is implemented using both RESTful and Eventing styles of microservice architecture.

## The Brief

As a consumer I want to receive the best flight offers between Melbourne and Brisbane available to me. These offers should be personalised depending on my preferences. I can enter the following preferences

 - Level of Service (Full/Budget)
 - If they are frequent flyer
 - Time of day

## The Implementations

### Eventing

### RESTFul
Running the app

## Make sure docker is up and running
- boot2docker start
- export DOCKER_HOST=tcp://192.168.59.103:2376
- export DOCKER_CERT_PATH=/Users/braiden.judd/.boot2docker/certs/boot2docker-vm
- export DOCKER_TLS_VERIFY=1

## Start the two backends (you have to have run npm install first)
- ./backend/event/startEvent.sh
- ./backend/event/startEvent.sh

## Host the frontend folder (you need to run a bower install first)
- cd ./frontend && python -m "SimpleHTTPServer"