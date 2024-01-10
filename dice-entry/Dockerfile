FROM node:21-alpine AS deps

WORKDIR /app
COPY package.json ./
RUN yarn install --frozen-lockfile

#######
# Rebuild the source code
FROM node:21-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

#######
# Build application
FROM node:21-alpine
WORKDIR /app
COPY --from=builder /app /app
EXPOSE 8080
CMD [ "yarn", "start" ]