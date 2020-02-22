#!/bin/bash

#rm -rf *.tar

docker build --build-arg http_proxy="$http_proxy" --build-arg https_proxy="$https_proxy" -t mqtt-client:0.0.1 .

#docker run -it mqtt-client:0.0.1

#docker save -o mqtt-client.tar mqtt-client:0.0.1

#chmod 777 *.tar