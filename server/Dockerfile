FROM node:20.17.0-alpine3.19 AS builder

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

FROM node:20.17.0-alpine3.19 AS production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist

RUN npm install --only=production

EXPOSE 8080

CMD ["node", "dist/src/index.js"]
