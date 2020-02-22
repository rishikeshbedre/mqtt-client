var mqtt = require('mqtt');
var fs = require('fs');
var fd = fs.openSync("logs/log.txt", 'a');

function subscriberWriteFile(HostAddress, Port, Username, Password, Topic, QOS){
    var options = {
        host: HostAddress,
        port: Port,
        username: Username,
        password: Password,
        protocolId: 'MQTT',
        protocolVersion: 4,
        clean : true
    };

    var client = mqtt.connect(options);

    client.on('connect', function () {
        client.subscribe(Topic, { qos: parseInt(QOS) }, function (err) {
            if (err) {
                console.log("cannot subscribe ", err);
            }
        });
    });
    
    client.on('message', function (topic, message) {
        // message is Buffer
        //console.log(JSON.parse(message))
        let timeinmss = new Date().toISOString();
        let data = message+","+timeinmss+","+topic;
        fs.appendFileSync(fd, data+"\n", 'utf8');
    });
}

module.exports = {
    subscriberWriteFile: subscriberWriteFile
};

