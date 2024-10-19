import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../database/schema";

export const pool = new pg.Pool({
	connectionString: process.env.POSTGRES_URL,
	ssl: false 
});


export const db = drizzle(pool, { schema });
