import { redis } from "src/config/redis";

export function Decision(data: any): string | boolean {

	if (data.machine_id === "welding_robot_006") {
		return data.gas_flow_rate < 40 ? "Fill up gas in the welding robot" : false;
	}
	if (data.machine_id === "stamping_press_001") {
		return data.lubrication_flow_rate < 1.1 ? "Lubricate the stamping press" : false;
	}
	if (data.machine_id === "painting_robot_002") {
		return data.paint_flow_rate < 10.2 ? "Add more paint to the paitaing robot" : false;
	}
	if (data.machine_id === "agv_003") {
		return data.battery_level < 29 ? "Recharge agv battery" : false;
	}
	if (data.machine_id === "cnc_milling_004") {
		return data.tool_wear_level < 30 ? "Change the tool wear for the cnc milling machine" : false;
	}

	return false

}


export async function ObserveState(data: any) {
	const decision = Decision(data)
	if (decision) {
		await redis.lpush("MAINTENECE_QUEUE", JSON.stringify({ task: decision, machine_id: data.machine_id }))
	}
}
