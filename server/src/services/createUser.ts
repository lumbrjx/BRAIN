import { db } from "src/config/database";
import bcrypt from "bcrypt";
import { UserSchemaData } from "@routes/auth/model.def";
import { users } from "src/database/schema";
import { parseToResult, Result } from "src/shared/result";

const createUser = async (data: UserSchemaData) => {
	const user = db.insert(users).values(data).returning({username: users.username}).then((s) => s[0]);
	return user;
};

export async function createUserService(
	data: UserSchemaData
): Promise<Result<any | boolean | undefined, Error | string | undefined>> {
	try {
		data = { ...data, password: await bcrypt.hash(data.password, 10) };

		const user = await createUser(data);
		console.log(user)

		return parseToResult(user);
	} catch (error) {

		console.log(error)
		return parseToResult(undefined, "INTERNAL SERVER ERROR");
	}
}


