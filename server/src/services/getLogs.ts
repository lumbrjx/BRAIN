import { client } from "src/config/influxClient";

const BUCKET = 'machines_logs'
const ORG = 'myorg'

const Machines = [
	'stamping_press_001',
	'painting_robot_002',
	'agv_003',
	'cnc_milling_004',
	'leak_test_005',
	'welding_robot_006'
];

export async function getLogs(machine_id: string): Promise<any[]> {
	if (!Machines.includes(machine_id)) {
		console.log('Invalid machine ID');
		throw new Error('Invalid machine ID');
	}

	const queryClient = client.getQueryApi(ORG)

	const fluxQuery = `
        from(bucket: "${BUCKET}")
            |> range(start: -15m)
            |> filter(fn: (r) => r._measurement == "${machine_id}")
            |> pivot(rowKey:["_time"], 
                    columnKey: ["_field"], 
                    valueColumn: "_value")
    `

	return new Promise((resolve, reject) => {
		const allLogs: any[] = []

		queryClient.queryRows(fluxQuery, {
			next: (row, tableMeta) => {
				const rowData = tableMeta.toObject(row)
				const logEntry = {
					time: new Date(rowData['_time']),
					...Object.keys(rowData)
						.filter(key =>
							!key.startsWith('_') &&
							rowData[key] !== null &&
							rowData[key] !== undefined &&
							rowData[key] !== ''
						)
						.reduce((acc, key) => ({
							...acc,
							[key]: rowData[key]
						}), {})
				}

				if (Object.keys(logEntry).length > 1) {
					allLogs.push(logEntry)
				}
			},
			error: (error) => {
				console.error('Error querying data:', error)
				reject(error)
			},
			complete: () => {
				resolve(allLogs)
			},
		})
	})
}

// Helper function to test the connection
export async function testInfluxConnection(): Promise<boolean> {
	try {
		const queryClient = client.getQueryApi(ORG)
		const fluxQuery = `from(bucket: "${BUCKET}") |> range(start: -1m) |> limit(n: 1)`

		return new Promise((resolve, reject) => {
			queryClient.queryRows(fluxQuery, {
				next: () => {
					resolve(true)
				},
				error: (error) => {
					console.error('Connection test failed:', error)
					reject(error)
				},
				complete: () => {
					resolve(true)
				},
			})
		})
	} catch (error) {
		console.error('Connection test failed:', error)
		return false
	}
}


