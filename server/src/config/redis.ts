import { Redis } from '@upstash/redis'

export const redis = new Redis({
	url: process.env.REDIS_HOST,
	token: process.env.REDIS_PASSWORD,
})

