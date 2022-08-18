FROM node:18.4.0 as server
RUN mkdir /blog
WORKDIR /blog
COPY ["package.json", "package-lock.json", "./"]
RUN yarn install --silent
CMD ["yarn", "dev"]