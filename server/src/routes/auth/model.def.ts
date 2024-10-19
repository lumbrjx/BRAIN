import { UsersTableSchema } from "src/database/models";
import { z } from "zod";

export const UserSchema = UsersTableSchema.omit({
	created_at: true, id: true
}).extend({
	username: z.string().min(4).max(1000),
	password: z.string().min(6).max(1000)
});

export const UserLoginSchema = UsersTableSchema.omit({
	created_at: true, id: true, role: true,
}).extend({
	username: z.string().min(4).max(1000),
	password: z.string().min(6).max(1000)
})



export interface UserSchemaData extends z.infer<typeof UserSchema> { }
export interface UserLoginSchemaData extends z.infer<typeof UserLoginSchema> { }

