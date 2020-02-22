var mqtt = require('mqtt');

function publisherClient(HostAddress, Port, Username, Password, Topic, MSG, QOS, publishInterval, MSGCount){
    var options = {
        host: HostAddress,
        port: Port,
        username: Username,
        password: Password,
        protocolId: 'MQTT',
        protocolVersion: 4
    };

    var client = mqtt.connect(options);

    client.on('connect', function () {
        publishData(Topic, MSG, QOS, publishInterval, MSGCount, client);
    });
}

function publishData(Topic, MSG, QOS, publishInterval, MSGCount, client) {
    var data = JSON.parse(MSG);
    setInterval(()=>{
        for(var i=1; i<=MSGCount; i++){
            data['timestamp'] = new Date().toISOString();
            client.publish(Topic+"/"+i, JSON.stringify(data), { qos: parseInt(QOS) }, function (err, packet) {
                if (err) {
                    console.log(err);
                    client.end();
                } 
            });
        }
    }, publishInterval);
}

module.exports = {
    publisherClient: publisherClient
};