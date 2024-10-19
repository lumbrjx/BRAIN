import { Point } from "@influxdata/influxdb-client"
import { client } from "src/config/influxClient";

export async function recordLogs(jsonData: any) {
	console.log(process.env.INFLUXDB_TOKEN)
	const point = new Point(jsonData.machine_id);

	for (const [key, value] of Object.entries(jsonData)) {
		if (key !== 'machine_id' && key !== 'timestamp') {
			if (typeof value === 'boolean') {
				point.booleanField(key, value);
			} else if (typeof value === 'string') {
				point.stringField(key, value);
			} else if (typeof value === 'number') {
				point.floatField(key, value);
			}
		}
	}

	point.timestamp(new Date(jsonData.timestamp));
	client.getWriteApi("myorg", "machines_logs", 'ns').writePoint(point)

}

