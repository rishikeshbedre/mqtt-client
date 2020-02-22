#!/bin/bash

#------------------------throughput----------------------------
export CLIENT_TYPE=THROUGHPUT
export MQTT_HOST=localhost
export MQTT_PORT=1883
export MQTT_USERNAME=xyz
export MQTT_PASSWORD=123
export MQTT_QOS=1
export MQTT_MSG=Hello
export THROUGHPUT_TOPIC=test
export THROUGHPUT_MAXMSGCOUNT=10000

#-----------------------publisher------------------------------
export CLIENT_TYPE=PUBLISHER
export MQTT_HOST=localhost
export MQTT_PORT=1883
export MQTT_USERNAME=xyz
export MQTT_PASSWORD=123
export MQTT_QOS=1
export MQTT_MSG='{"demo":"123","user":"xyz"}'
export PUBLISHER_TOPIC=test
export PUBLISH_INTERVAL=1000
export PUBLISH_MSGCOUNT=5000

#----------------------subscriber console----------------------
export CLIENT_TYPE=SUBSCRIBER_CONSOLE
export MQTT_HOST=localhost
export MQTT_PORT=1883
export MQTT_USERNAME=xyz
export MQTT_PASSWORD=123
export MQTT_QOS=1
export SUBSCRIBER_TOPIC="test/#"

#----------------------subscriber file----------------------
export CLIENT_TYPE=SUBSCRIBER_FILE
export MQTT_HOST=localhost
export MQTT_PORT=1883
export MQTT_USERNAME=xyz
export MQTT_PASSWORD=123
export MQTT_QOS=1
export SUBSCRIBER_TOPIC="test/#"