FROM node:12.0.0-stretch as build-deps
RUN apt update -y && apt install libxss1 git -y
RUN npm i -g typescript
COPY . /root
WORKDIR /root/
RUN npm install
CMD npm start
