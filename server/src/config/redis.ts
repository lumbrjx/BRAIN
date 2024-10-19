import Redis from "ioredis"

export const redis = new Redis({ host: process.env.REDIS_HOST, port: 6379 });
export const redisPubSub = new Redis({ host: process.env.REDIS_HOST, port: 6379 });


