FROM node:10.15.3-stretch as build-deps
RUN apt update -y && apt install libxss1 git -y
RUN npm i -g typescript
COPY . /root
WORKDIR /root/
RUN wget https://storage.googleapis.com/lesback/node_modules.tar.gz
RUN tar -xzf node_modules.tar.gz
RUN rm node_modules.tar.gz
RUN npm i
CMD npm start
