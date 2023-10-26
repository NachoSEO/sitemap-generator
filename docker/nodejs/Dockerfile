FROM node:20.9.0-alpine AS production

RUN apk add yarn

COPY ./src /opt/app

WORKDIR /opt/app

# Required dependencies
RUN yarn 
