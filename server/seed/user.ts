import { users } from "../src/database/schema";
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { config } from "dotenv";
import bcrypt from "bcrypt";

config();
const pool = new pg.Pool({
	connectionString: process.env.POSTGRES_URL,
	ssl: true
});

const db = drizzle(pool);


async function main() {
	console.log("seeding users...");
	const data = await bcrypt.hash("superuser", 10)

	await db.insert(users).values({ username: "superuser", role: "SUPERUSER", password: data });
	console.log("users created successfully");
	process.exit(0);
}
main().catch((err) => {
	console.log(err);
	process.exit(0);
});
