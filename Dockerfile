FROM node:12.0.0-alpine as build-deps
RUN apt update -y && apt install libxss1 git -y
COPY . /root
WORKDIR /root/
RUN npm i -g typescript
RUN npm install
CMD npm start
