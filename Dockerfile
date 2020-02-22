FROM alpine:3.11

RUN mkdir /home/app/ \
    && mkdir /home/app/logs \
    && chmod -R 777 /home/app/logs \
    && apk add --no-cache nodejs npm

WORKDIR /home/app/

COPY client /home/app/client
COPY package.json /home/app/

RUN npm install \
    && apk del npm
    
CMD node ./client/index.js