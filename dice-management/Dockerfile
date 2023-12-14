FROM node:21-alpine as base
WORKDIR /app
COPY package.json yarn.lock ./
EXPOSE 8079
RUN yarn install --production --frozen-lockfile

FROM base as dev_deps
RUN yarn install

FROM dev_deps as builder
COPY tsconfig.json tsconfig.build.json ./
COPY src ./src
RUN yarn build

FROM dev_deps as dev
ENV NODE_ENV=development
CMD ["yarn", "dev"]

FROM base as prod
ENV NODE_ENV=production
COPY --from=builder /app/build /app/build
COPY ./config /app/config
COPY ./.env /app/
CMD ["yarn", "start"]
