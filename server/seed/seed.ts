import { machines, users } from "../src/database/schema";
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
const Machines = [
	'stamping_press_001',
	'painting_robot_002',
	'agv_003',
	'cnc_milling_004',
	'leak_test_005',
	'welding_robot_006'
];



async function main() {
	// try {
	// 	console.log("seeding users...");
	// 	const data = await bcrypt.hash("superuser", 10)
	// 	await db.insert(users).values({ username: "superuser", role: "SUPERUSER", password: data });
	// 	console.log("users created successfully");
	// } catch (err) {
	// 	console.log(err)
	// }
	try {

		console.log("seeding machines...");
		for (let machine of Machines){
			await db.insert(machines).values({ name: machine });
		}

		console.log("machines created successfully");
	} catch (err) {
		console.log(err)

	}

	process.exit(0);
}
main().catch((err) => {
	console.log(err);
	process.exit(0);
});
