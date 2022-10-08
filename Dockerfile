FROM node:lts-alpine3.15 as build
WORKDIR /src
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build

FROM node:lts-alpine3.15
WORKDIR /app
COPY --from=build /src/dist .
ENTRYPOINT [ "node", "/app/host" ]
