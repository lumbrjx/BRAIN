import { pgTable, text, uuid, index, varchar, timestamp } from "drizzle-orm/pg-core";

export const jobs = pgTable(
	"jobs",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		name: varchar("name").unique().notNull(),
		timesc: text("timesc").notNull(),
		machine_id: text("machine_id").notNull(),
		created_at: timestamp("created_at").notNull().defaultNow(),
	},
	(table) => {
		return {
			jobs_id_idx: index("jobs_id_idx").on(table.id),
		};
	}
);


