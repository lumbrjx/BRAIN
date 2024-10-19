import { client } from "src/config/influxClient";

const Machines = [
	'stamping_press_001',
	'painting_robot_002',
	'agv_003',
	'cnc_milling_004',
	'leak_test_005',
	'welding_robot_006'
];

export async function getLogs(machine_id: string) {
	console.log(machine_id)
	if (!Machines.includes(machine_id)) {
		console.log('Invalid machine ID');
		return 'Invalid machine ID'
	}

	const query = `
    SELECT *
    FROM ${machine_id}
    WHERE time >= now() - interval '15 minutes'
  `;

	const rows = client.query(query, 'machines_logs');

	const columns = [
		'atomizer_speed',
		'booth_airflow_velocity',
		'chip_load',
		'coolant_flow_rate',
		'cut_depth',
		'cycle_count',
		'cycle_time',
		'die_alignment',
		'feed_rate',
		'fluid_type',
		'force_applied',
		'gas_flow_rate',
		'humidity',
		'leak_rate',
		'lubrication_flow_rate',
		'material_hardness',
		'noise_level',
		'oil_pressure',
		'overspray_capture_efficiency',
		'paint_flow_rate',
		'paint_thickness',
		'paint_volume_used',
		'power_consumption',
		'pressure_applied',
		'pressure_drop',
		'seal_condition',
		'sheet_thickness',
		'solvent_concentration',
		'spindle_speed',
		'spray_pressure',
		'status',
		'temperature',
		'test_cycle_count',
		'test_duration',
		'test_pressure',
		'time',
		'tool_wear_level',
		'vibration_level',
		'weld_current',
		'weld_strength_estimate',
		'weld_temperature',
		'weld_time',
		'weld_voltage',
		'wire_feed_rate',
	];

	const allLogs = [];

	for await (const row of rows) {
		const logEntry: any = {
			time: new Date(row['time']),
		};

		columns.forEach(column => {
			const value = row[column];
			if (value !== undefined && value !== null && value !== '') {
				logEntry[column] = value;
			}
		});

		if (Object.keys(logEntry).length > 1) {
			allLogs.push(logEntry);
		}
	}

	return allLogs;
}


