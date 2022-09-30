FROM node:14.18.0 AS install-stage
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json package-lock.json yarn.lock tsconfig.json ./
RUN yarn --frozen-lockfile

FROM install-stage AS modules
RUN yarn --pure-lockfile --poduction

FROM install-stage AS build-stage
COPY . .
RUN yarn build

USER 1001
EXPOSE 3000
CMD ["yarn", "serve"]