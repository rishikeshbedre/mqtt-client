var mqtt = require('mqtt');
var SubCount = 0;

function datalossClient(HostAddress, Port, Username, Password, QOS, Topic, MSG, PubCount, PublishInterval){
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
        publishMessage(PubCount, Topic, QOS, MSG, PublishInterval, client);
    });
    
    client.on('message', function (intopic, message) {
        if(intopic == Topic){
            ++SubCount;
        }
    });    
}

function publishMessage(PubCount, Topic, QOS, MSG, PublishInterval, client){
    setInterval(()=>{
        console.log("subscription messages received:", SubCount);
        console.log("% of loss:", (SubCount/PubCount*100)-100,"%");
        SubCount = 0; 
        for(var i=0; i<PubCount; i++){
            client.publish(Topic, MSG, { qos: parseInt(QOS) });
        }
    },PublishInterval);
}

module.exports = {
    datalossClient: datalossClient
};
