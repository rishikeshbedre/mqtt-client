var throughPut = require("./throughput");
var publisher = require("./publisher");
var subscriberConsole = require("./subscriber-console");
var subscriberfile = require("./subscriber-file");
var dataloss = require("./dataloss");

function init() {
    var clientType = process.env.CLIENT_TYPE;
    var host = process.env.MQTT_HOST;
    var username = process.env.MQTT_USERNAME;
    var password = process.env.MQTT_PASSWORD;
    var port = process.env.MQTT_PORT;
    var qos = process.env.MQTT_QOS;
    var msg = process.env.MQTT_MSG;
    if (clientType === "THROUGHPUT") {
        throughPut.throughPutClient(host, port, username, password, process.env.THROUGHPUT_TOPIC, qos, msg, process.env.THROUGHPUT_MAXMSGCOUNT);
    }
    else if (clientType === "PUBLISHER") {
        publisher.publisherClient(host, port, username, password, process.env.PUBLISHER_TOPIC, msg, qos, process.env.PUBLISH_INTERVAL, process.env.PUBLISH_MSGCOUNT);
    }
    else if (clientType === "SUBSCRIBER_CONSOLE") {
        subscriberConsole.subscriberClient(host, port, username, password, process.env.SUBSCRIBER_TOPIC, qos);
    }
    else if (clientType === "SUBSCRIBER_FILE") {
        subscriberfile.subscriberFile(host, port, username, password, process.env.SUBSCRIBER_TOPIC, qos);
    }
    else if (clientType === "DATALOSS") {
        dataloss.datalossClient(host, port, username, password, qos, process.env.DATALOSS_TOPIC, msg, process.env.PUBLISH_MSGCOUNT, process.env.PUBLISH_INTERVAL);
    }
}

init();