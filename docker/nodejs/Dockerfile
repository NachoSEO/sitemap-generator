FROM node:20.9.0-alpine AS production

RUN apk add yarn

COPY ./src /opt/app

RUN cd /opt/app && yarn install

WORKDIR /opt/app

# Required dependencies

