import { Point } from "@influxdata/influxdb3-client"
import { client } from "src/config/influxClient";

export async function recordLogs(jsonData: any) {
	const point = Point.measurement(jsonData.machine_id);

	for (const [key, value] of Object.entries(jsonData)) {
		if (key !== 'machine_id' && key !== 'timestamp') {
			if (typeof value === 'boolean') {
				point.setBooleanField(key, value);
			} else if (typeof value === 'string') {
				point.setStringField(key, value);
			} else if (typeof value === 'number') {
				point.setFloatField(key, value);
			}
		}
	}

	point.setTimestamp(new Date(jsonData.timestamp));
	await client.write(point, "machines_logs")

}

