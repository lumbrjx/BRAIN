import { pgTable, text, uuid, index, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const StateTypeEnum = pgEnum("stateTypeE", [
	"WORKING",
	"ERROR",
	"UNDER_MAINTENENCE",
]);

export const machines = pgTable(
	"machines",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		name: varchar("name").unique().notNull(),
		state: StateTypeEnum("stateTypeE").notNull().default("WORKING"),
		info: text("info").notNull().default("no detected issues"),
		created_at: timestamp("created_at").notNull().defaultNow(),

			},
	(table) => {
		return {
			machine_id_idx: index("machine_id_idx").on(table.id),
		};
	}
);


