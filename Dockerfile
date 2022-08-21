FROM node:16.15.0-buster-slim

WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY . .

# RUN yarn lint
# RUN yarn test:silent
RUN yarn build

CMD [ "yarn", "start"]
