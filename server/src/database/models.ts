import {  createSelectSchema } from "drizzle-zod";
import {jobs, machines, users} from "./schema";
import { z } from "zod";

export const UsersTableSchema= createSelectSchema(users);
export const MachinesTableSchema = createSelectSchema(machines)
export const JobsTableSchema = createSelectSchema(jobs)

export interface UserTableInterface
	extends z.infer<typeof UsersTableSchema> { }
export interface MachinesTableInterface
	extends z.infer<typeof MachinesTableSchema> { }
export interface JobsTableInterface
	extends z.infer<typeof JobsTableSchema> { }

