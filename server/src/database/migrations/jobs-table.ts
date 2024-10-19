import { pgTable, text,uuid, index, varchar, timestamp, time } from "drizzle-orm/pg-core";
import { machines } from "./machines-table";

export const jobs= pgTable(
	"jobs",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		name: varchar("name").unique().notNull(),
		time: time("time"),
		description: text("info").notNull().default("no detected issues"),
		machine_id: text("machine_id")
			.unique()
			.references(() => machines.id, { onDelete: "cascade" }),
		created_at: timestamp("created_at").notNull().defaultNow(),
	},
	(table) => {
		return {
			machine_id_idx: index("machine_id_idx").on(table.id),
		};
	}
);


