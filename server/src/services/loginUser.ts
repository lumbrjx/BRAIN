import { db } from "src/config/database";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { UserLoginSchemaData } from "@routes/auth/model.def";
import { users } from "src/database/schema";
import { parseToResult, Result } from "src/shared/result";

export async function loginUserService(
	data:UserLoginSchemaData
): Promise<Result<any | boolean | undefined, Error | string | undefined>> {
	try {
		const user = await db.select().from(users).where(eq(users.username, data.username)).then((s) => s[0]);
		!user && parseToResult(undefined, "INVALID CREDENTIALS");
		const passed = await bcrypt.compare(
			data.password,
			user?.password as string
		);

		return user && passed
			? parseToResult(user)
			: parseToResult(undefined, "UNAUTHORIZED");
	} catch (error) {
		return parseToResult(undefined, "INTERNAL SERVER ERROR");
	}
}
