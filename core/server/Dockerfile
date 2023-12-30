# Add docker config here
FROM node:14.18.0 AS install-stage
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json yarn.lock tsconfig.prod.json .
RUN yarn --frozen-lockfile

FROM install-stage AS modules
RUN yarn --pure-lockfile --production

FROM install-stage AS build-stage
COPY . .
RUN yarn gulp:build

FROM node:14.18.0 AS production-stage
ENV DISABLE_WELCOME_MESSAGE=1
ENV NODE_ENV="production"
WORKDIR /app/node_modules
COPY --from=modules /usr/app/node_modules .
WORKDIR /app
COPY --from=build-stage /usr/app/dist .
COPY package.json .
RUN chmod 777 .

USER 1001
EXPOSE 3000
CMD [ "yarn", "serve" ]
