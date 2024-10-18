import {  createSelectSchema } from "drizzle-zod";
import {users} from "./schema";
import { z } from "zod";

export const UsersTableSchema= createSelectSchema(users);

export interface UserTableInterface
	extends z.infer<typeof UsersTableSchema> { }
