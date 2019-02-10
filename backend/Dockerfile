FROM node:10.13.0

LABEL MAINTAINER Michael Hueter <mthueter@gmail.com>

RUN mkdir -p /home/nodejs/app

COPY ./wait_for_it.sh /home/nodejs/app

RUN npm install pm2@3.2.2 --global --quiet
# add local user for security
RUN groupadd -r nodejs \
  && useradd -m -r -g nodejs nodejs

USER nodejs

WORKDIR /home/nodejs/app
COPY . /home/nodejs/app


RUN npm install --production --quiet

EXPOSE 5000

