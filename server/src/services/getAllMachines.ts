import { db } from "src/config/database";
import { machines } from "src/database/schema";
import { parseToResult, Result } from "src/shared/result";
import { MachinesSchemaData } from "@routes/machines/model.def";

const getAllMachines = async () => {
	const machine = db.select({
		name: machines.name, state: machines.state, info: machines.info, created_at: machines.created_at
	}).from(machines)
	return machine;
};

export async function getAllMachinesService(): Promise<Result<MachinesSchemaData[] | boolean | undefined, Error | string | undefined>> {
	try {

		const machines = await getAllMachines();

		return parseToResult(machines);
	} catch (error) {

		console.log(error)
		return parseToResult(undefined, "INTERNAL SERVER ERROR");
	}
}


