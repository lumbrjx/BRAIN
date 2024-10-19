FROM node:20.17.0-alpine3.19 AS builder

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

FROM node:20.17.0-alpine3.19 AS production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/ecosystem.config.cjs ./
RUN npm install --only=production
RUN npm install -g pm2

EXPOSE 8080
EXPOSE 8081

CMD ["pm2-runtime", "start" , "ecosystem.config.cjs"]
