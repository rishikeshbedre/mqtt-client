var mqtt = require('mqtt');
var now = require('performance-now');
var pubcount = 0;
var recvcount = 0;
var recvstart;
var recvend;
var pubstart;
var pubend;

function throughPutClient(HostAddress, Port, Username, Password, Topic, QOS, MSG, MaxMSGCount) {
    console.log("Throughput Client");
    console.log("starting on topic ", Topic);
    console.log("configuration:", HostAddress, Port, Username, Password, Topic, QOS, MSG, MaxMSGCount);
    var options = {
        host: HostAddress,
        port: Port,
        username: Username,
        password: Password,
        protocolId: 'MQTT',
        protocolVersion: 4,
        clean: true
    };

    var client = mqtt.connect(options);

    client.on('connect', function () {
        client.subscribe(Topic, { qos: parseInt(QOS) }, function (err) {
            if (err) {
                console.log("cannot subscribe ", err);
            }
        });
        pubstart = now();
        recvstart = pubstart;
        client.publish(Topic, MSG, { qos: parseInt(QOS) });
    });

    client.on('message', function (intopic, message) {
        if (intopic === Topic) {
            if (++pubcount >= MaxMSGCount) {
                pubcount = 0;
                pubend = now();
                console.log('pubs per sec :', 1000 * MaxMSGCount / (pubend - pubstart));
                pubstart = pubend;
            }
            client.publish(Topic, MSG, { qos: parseInt(QOS) });
        }
        if (++recvcount >= MaxMSGCount) {
            recvcount = 0;
            recvend = now();
            console.log('receives per sec :', 1000 * MaxMSGCount / (recvend - recvstart));
            recvstart = recvend;
        }
    });
}

module.exports = {
    throughPutClient: throughPutClient
};