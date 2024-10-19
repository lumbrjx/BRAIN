import z from "zod";
import { config } from "dotenv";
config();

const envSchema = z.object({
	POSTGRES_PASSWORD: z.string().min(1),
	POSTGRES_USER: z.string().min(1),
	POSTGRES_URL: z.string().min(1),
	DB_SCHEMA_PATH: z.string().min(1),
	DB_OUT_PATH: z.string().min(1),
	API_URL: z.string().min(1),
	API_VERSION: z.string().min(1),
	HOST: z.string().min(1),
	PORT: z.string().min(1),
	INFLUX_URL: z.string().min(1),
	INFLUXDB_TOKEN: z.string().min(1),
	CALLBACK_URL: z.string().min(1),
	DEVFEST_URL: z.string().min(1),
	PASSWORD_SALT: z.string().min(1),
	SESSION_SECRET: z.string().min(1),
	SECRET: z.string().min(1),
	TOKEN_NAME: z.string().min(1),
	AI_URL: z.string().min(1),
	REDIS_HOST: z.string().min(1),
	REDIS_QUEUE: z.string().min(1),
});

const envServer = envSchema.parse({
	POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
	POSTGRES_USER: process.env.POSTGRES_USER,
	POSTGRES_URL: process.env.POSTGRES_URL,
	DB_SCHEMA_PATH: process.env.DB_SCHEMA_PATH,
	DB_OUT_PATH: process.env.DB_OUT_PATH,
	API_URL: process.env.API_URL,
	API_VERSION: process.env.API_URL,
	HOST: process.env.HOST,
	PORT: process.env.PORT,
	INFLUX_URL: process.env.INFLUX_URL,
	INFLUXDB_TOKEN: process.env.INFLUXDB_TOKEN,
	CALLBACK_URL: process.env.CALLBACK_URL,
	DEVFEST_URL: process.env.DEVFEST_URL,
	PASSWORD_SALT: process.env.PASSWORD_SALT,
	SESSION_SECRET: process.env.SESSION_SECRET,
	SECRET: process.env.SECRET,
	TOKEN_NAME: process.env.TOKEN_NAME,
	AI_URL: process.env.AI_URL,
	REDIS_HOST: process.env.REDIS_HOST,
	REDIS_QUEUE: process.env.REDIS_QUEUE,

});

export const envServerSchema = envServer;
type EnvSchemaType = z.infer<typeof envSchema>;

declare global {
	namespace NodeJS {
		interface ProcessEnv extends EnvSchemaType { }
	}
}

console.log("Validated environment variables.");
