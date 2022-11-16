FROM node:16

WORKDIR /crud_api_rest
COPY package.json .
RUN yarn install
COPY . .
CMD yarn dev