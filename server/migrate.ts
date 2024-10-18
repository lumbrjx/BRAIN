import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { config } from "dotenv";
config();
const pool = new pg.Pool({
	connectionString: process.env.POSTGRES_URL,
	ssl: false
});

const db = drizzle(pool);
async function main() {
	console.log("migration started...");
	await migrate(db, { migrationsFolder: "src/database/drizzle" });
	console.log("migration ended...");
	process.exit(0);
}

main().catch((err) => {
	console.log(err);
	process.exit(0);
});
