import {  createSelectSchema } from "drizzle-zod";
import {machines, users} from "./schema";
import { z } from "zod";

export const UsersTableSchema= createSelectSchema(users);
export const MachinesTableSchema = createSelectSchema(machines)

export interface UserTableInterface
	extends z.infer<typeof UsersTableSchema> { }
export interface MachinesTableInterface
	extends z.infer<typeof MachinesTableSchema> { }
