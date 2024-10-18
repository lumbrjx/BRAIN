import { pgTable, uuid, index, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const RoleTypeEnum = pgEnum("roleTypeE", [
	"SUPERUSER",
	"OPERATOR",
	"MAINTAINER",
]);
export const users = pgTable(
	"users",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		username: varchar("username").unique().notNull(),
		password: varchar("password").notNull(),
		role: RoleTypeEnum("roleTypeE").notNull(),
		created_at: timestamp("created_at").notNull().defaultNow(),
	},
	(table) => {
		return {
			user_id_idx: index("user_id_idx").on(table.id),
		};
	}
);


