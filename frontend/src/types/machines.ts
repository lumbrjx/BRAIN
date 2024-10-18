// Sensor Data Types for All Machines

export interface WeldingRobot {
    machine_id: "welding_robot_006";
    weld_temperature: number; // in °C
    weld_current: number; // in A (amperes)
    weld_voltage: number; // in V
    weld_time: number; // in milliseconds
    pressure_applied: number; // in N (newtons)
    arm_position: { x: number; y: number; z: number }; // spatial coordinates
    wire_feed_rate: number; // in mm/min (arc welding)
    gas_flow_rate: number; // in l/min
    weld_strength_estimate: number; // in N
    vibration_level: number; // in mm/s
    power_consumption: number; // in kWh
    timestamp: string; // ISO 8601 format
  }
  
  export interface StampingPress {
    machine_id: "stamping_press_001";
    force_applied: number; // in tons
    cycle_time: number; // in seconds
    temperature: number; // in °C
    vibration_level: number; // in mm/s
    cycle_count: number; // count of cycles
    oil_pressure: number; // in bar
    die_alignment: string; // status
    sheet_thickness: number; // in mm
    power_consumption: number; // in kWh
    noise_level: number; // in dB
    lubrication_flow_rate: number; // in ml/min
    timestamp: string; // ISO 8601 format
  }
  
  export interface PaintingRobot {
    machine_id: "painting_robot_002";
    spray_pressure: number; // in bar
    paint_thickness: number; // in μm
    arm_position: { x: number; y: number; z: number }; // spatial coordinates
    temperature: number; // in °C
    humidity: number; // in %RH
    paint_flow_rate: number; // in ml/min
    paint_volume_used: number; // in liters
    atomizer_speed: number; // in RPM
    overspray_capture_efficiency: number; // in %
    booth_airflow_velocity: number; // in m/s
    solvent_concentration: number; // in %
    timestamp: string; // ISO 8601 format
  }
  
  export interface AGV {
    machine_id: "agv_003";
    location: { x: number; y: number; z: number }; // spatial coordinates
    battery_level: number; // in %
    load_weight: number; // in kg
    speed: number; // in m/s
    distance_traveled: number; // in meters
    obstacle_detection: string; // yes or no
    navigation_status: string; // en_route, waiting, rerouting
    vibration_level: number; // in mm/s
    temperature: number; // in °C
    wheel_rotation_speed: number; // in RPM
    timestamp: string; // ISO 8601 format
  }
  
  export interface CNCMachine {
    machine_id: "cnc_milling_004";
    spindle_speed: number; // in RPM
    tool_wear_level: number; // in %
    cut_depth: number; // in mm
    feed_rate: number; // in mm/min
    vibration_level: number; // in mm/s
    coolant_flow_rate: number; // in ml/min
    material_hardness: number; // in HB (Brinell hardness)
    power_consumption: number; // in kWh
    temperature: number; // in °C
    chip_load: number; // in mm
    timestamp: string; // ISO 8601 format
  }
  
  export interface LeakTestMachine {
    machine_id: "leak_test_005";
    test_pressure: number; // in bar
    pressure_drop: number; // in bar
    leak_rate: number; // in ml/min
    test_duration: number; // in seconds
    temperature: number; // in °C
    status: string; // pass or fail
    fluid_type: string; // type of fluid used
    seal_condition: string; // good, warning, or fail
    test_cycle_count: number; // number of test cycles
    timestamp: string; // ISO 8601 format
  }
  