import React from 'react';

interface CardProps {
	data: {
		machine_id: string;
		[key: string]: any;
	} | null;  // Make data nullable
	type: string;
}

const Card: React.FC<CardProps> = ({ data, type }) => {
	const getBorderColor = () => {
		// First check if data exists and has content
		if (!data || !data.machine_id) {
			return 'border-black';
		}

		// Only check type if we have valid data
		switch (type) {
			case 'ALERT':
				return 'border-red-500';
			case 'LOG':
				return 'border-green-500';
			default:
				return 'border-gray-500';
		}
	};

	// Show loading state if no data or no machine_id
	if (!data || !data.machine_id) {
		return (
			<div className={`relative rounded-lg p-3 w-full flex flex-col border-2 border-black`}>
				<div className="w-full relative z-20 p-2">
					<p className="text-gray-500 text-center">Waiting for data...</p>
				</div>
			</div>
		);
	}

	return (
		<div className={`relative rounded-lg p-3 w-full flex flex-col border-2 ${getBorderColor()}`}>
			<div className="w-full relative z-20 p-2">
				<h3 className="font-bold text-lg">{data.machine_id}</h3>
				{renderMachineData(data)}
			</div>
		</div>
	);
};

const renderMachineData = (data: { machine_id: string;[key: string]: any }) => {
	const machineData = { ...data };

	switch (data.machine_id) {
		case 'welding_robot_006':
			return (
				<>
					<p>Weld Temperature: {machineData.weld_temperature} °C</p>
					<p>Weld Current: {machineData.weld_current} A</p>
					<p>Weld Voltage: {machineData.weld_voltage} V</p>
					<p>Weld Time: {machineData.weld_time} ms</p>
					<p>Pressure Applied: {machineData.pressure_applied} N</p>
					<p>Arm Position: x:{machineData.arm_position?.x}, y:{machineData.arm_position?.y}, z:{machineData.arm_position?.z}</p>
					<p>Wire Feed Rate: {machineData.wire_feed_rate} mm/min</p>
					<p>Gas Flow Rate: {machineData.gas_flow_rate} l/min</p>
					<p>Weld Strength Estimate: {machineData.weld_strength_estimate} N</p>
					<p>Vibration Level: {machineData.vibration_level} mm/s</p>
					<p>Power Consumption: {machineData.power_consumption} kWh</p>
					<p>Timestamp: {machineData.timestamp}</p>
				</>
			);
		case 'stamping_press_001':
			return (
				<>
					<p>Force Applied: {machineData.force_applied} tons</p>
					<p>Cycle Time: {machineData.cycle_time} seconds</p>
					<p>Temperature: {machineData.temperature} °C</p>
					<p>Vibration Level: {machineData.vibration_level} mm/s</p>
					<p>Cycle Count: {machineData.cycle_count}</p>
					<p>Oil Pressure: {machineData.oil_pressure} bar</p>
					<p>Die Alignment: {machineData.die_alignment}</p>
					<p>Sheet Thickness: {machineData.sheet_thickness} mm</p>
					<p>Power Consumption: {machineData.power_consumption} kWh</p>
					<p>Noise Level: {machineData.noise_level} dB</p>
					<p>Lubrication Flow Rate: {machineData.lubrication_flow_rate} ml/min</p>
					<p>Timestamp: {machineData.timestamp}</p>
				</>
			);
		case 'painting_robot_002':
			return (
				<>
					<p>Spray Pressure: {machineData.spray_pressure} bar</p>
					<p>Paint Thickness: {machineData.paint_thickness} μm</p>
					<p>Arm Position: x:{machineData.arm_position?.x}, y:{machineData.arm_position?.y}, z:{machineData.arm_position?.z}</p>
					<p>Temperature: {machineData.temperature} °C</p>
					<p>Humidity: {machineData.humidity} %RH</p>
					<p>Paint Flow Rate: {machineData.paint_flow_rate} ml/min</p>
					<p>Paint Volume Used: {machineData.paint_volume_used} liters</p>
					<p>Atomizer Speed: {machineData.atomizer_speed} RPM</p>
					<p>Overspray Capture Efficiency: {machineData.overspray_capture_efficiency} %</p>
					<p>Booth Airflow Velocity: {machineData.booth_airflow_velocity} m/s</p>
					<p>Solvent Concentration: {machineData.solvent_concentration} %</p>
					<p>Timestamp: {machineData.timestamp}</p>
				</>
			);
		case 'agv_003':
			return (
				<>
					<p>Location: x:{machineData.location?.x}, y:{machineData.location?.y}, z:{machineData.location?.z}</p>
					<p>Battery Level: {machineData.battery_level} %</p>
					<p>Load Weight: {machineData.load_weight} kg</p>
					<p>Speed: {machineData.speed} m/s</p>
					<p>Distance Traveled: {machineData.distance_traveled} m</p>
					<p>Obstacle Detection: {machineData.obstacle_detection}</p>
					<p>Navigation Status: {machineData.navigation_status}</p>
					<p>Vibration Level: {machineData.vibration_level} mm/s</p>
					<p>Temperature: {machineData.temperature} °C</p>
					<p>Wheel Rotation Speed: {machineData.wheel_rotation_speed} RPM</p>
					<p>Timestamp: {machineData.timestamp}</p>
				</>
			);
		case 'cnc_milling_004':
			return (
				<>
					<p>Spindle Speed: {machineData.spindle_speed} RPM</p>
					<p>Tool Wear Level: {machineData.tool_wear_level} %</p>
					<p>Cut Depth: {machineData.cut_depth} mm</p>
					<p>Feed Rate: {machineData.feed_rate} mm/min</p>
					<p>Vibration Level: {machineData.vibration_level} mm/s</p>
					<p>Coolant Flow Rate: {machineData.coolant_flow_rate} ml/min</p>
					<p>Material Hardness: {machineData.material_hardness} HB</p>
					<p>Power Consumption: {machineData.power_consumption} kWh</p>
					<p>Temperature: {machineData.temperature} °C</p>
					<p>Chip Load: {machineData.chip_load} mm</p>
					<p>Timestamp: {machineData.timestamp}</p>
				</>
			);
		case 'leak_test_005':
			return (
				<>
					<p>Test Pressure: {machineData.test_pressure} bar</p>
					<p>Pressure Drop: {machineData.pressure_drop} bar</p>
					<p>Leak Rate: {machineData.leak_rate} ml/min</p>
					<p>Test Duration: {machineData.test_duration} seconds</p>
					<p>Temperature: {machineData.temperature} °C</p>
					<p>Status: {machineData.status}</p>
					<p>Fluid Type: {machineData.fluid_type}</p>
					<p>Seal Condition: {machineData.seal_condition}</p>
					<p>Test Cycle Count: {machineData.test_cycle_count}</p>
					<p>Timestamp: {machineData.timestamp}</p>
				</>
			);
		default:
			console.error(`Unknown machine_id: ${data.machine_id}`);
			return <p>Waiting for this machine's real time data</p>;
	}
};

export default Card;
