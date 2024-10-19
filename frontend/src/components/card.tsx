import React from 'react';

interface CardProps {
  data: {
    machine_id: string; 
    [key: string]: any; 
  };
  type: string; 
}

const Card: React.FC<CardProps> = ({ data, type }) => {
  const getGradientColor = () => {
    switch (type) {
      case 'ALERT':
        return 'from-orange-500/25';
      case 'LOG':
        return 'from-emerald-500/25';
      default:
        return 'from-black/25';
    }
  };

  return (
    <div className={`relative rounded-lg p-3 max-w-[356px] max-h-[170px] flex flex-col items-center`}>
      <div className={`absolute bottom-0 left-0 right-0 h-[100px] pointer-events-none z-10 bg-gradient-to-t ${getGradientColor()} to-transparent rounded-b-[14px]`}></div>
      <div className="overflow-y-hidden h-full scrollbar-hide relative z-20 p-2">
        <h3 className="font-bold text-lg">{data.machine_id}</h3>
        {renderMachineData(data)}
      </div>
      <button 
        className={`${
          type === 'ALERT' 
            ? 'bg-orange-600 hover:bg-orange-700' 
            : 'bg-emerald-600 hover:bg-emerald-700'
        } text-white py-1 px-3 rounded-[15px] mt-1 w-1/2 relative z-20`}
      >
        Show more
      </button>
    </div>
  );
};

const renderMachineData = (data: { machine_id: string; [key: string]: any }) => {
  const defaultData = {
    weld_temperature: "-",
    weld_current: "-",
    weld_voltage: "-",
    weld_time: "-",
    wire_feed_rate: "-",
    gas_flow_rate: "-",
    power_consumption: "-",
    force_applied: "-",
    cycle_time: "-",
    temperature: "-",
    cycle_count: "-",
    oil_pressure: "-",
    sheet_thickness: "-",
    spray_pressure: "-",
    paint_thickness: "-",
    humidity: "-",
    paint_volume_used: "-",
    solvent_concentration: "-",
    battery_level: "-",
    load_weight: "-",
    speed: "-",
    distance_traveled: "-",
    obstacle_detection: "-",
    navigation_status: "-",
    spindle_speed: "-",
    tool_wear_level: "-",
    cut_depth: "-",
    feed_rate: "-",
    test_pressure: "-",
    pressure_drop: "-",
    leak_rate: "-",
    test_duration: "-",
    status: "-",
    seal_condition: "-",
  };

  const machineData = { ...defaultData, ...data };

  switch (data.machine_id) {
    case 'welding_robot_006':
      return (
        <>
          <p>Weld Temperature: {machineData.weld_temperature} °C</p>
          <p>Weld Current: {machineData.weld_current} A</p>
          <p>Weld Voltage: {machineData.weld_voltage} V</p>
          <p>Weld Time: {machineData.weld_time} ms</p>
          <p>Wire Feed Rate: {machineData.wire_feed_rate} mm/min</p>
          <p>Gas Flow Rate: {machineData.gas_flow_rate} l/min</p>
          <p>Power Consumption: {machineData.power_consumption} kWh</p>
        </>
      );
    case 'stamping_press_001':
      return (
        <>
          <p>Force Applied: {machineData.force_applied} tons</p>
          <p>Cycle Time: {machineData.cycle_time} seconds</p>
          <p>Temperature: {machineData.temperature} °C</p>
          <p>Cycle Count: {machineData.cycle_count}</p>
          <p>Oil Pressure: {machineData.oil_pressure} bar</p>
          <p>Sheet Thickness: {machineData.sheet_thickness} mm</p>
          <p>Power Consumption: {machineData.power_consumption} kWh</p>
        </>
      );
    case 'painting_robot_002':
      return (
        <>
          <p>Spray Pressure: {machineData.spray_pressure} bar</p>
          <p>Paint Thickness: {machineData.paint_thickness} μm</p>
          <p>Temperature: {machineData.temperature} °C</p>
          <p>Humidity: {machineData.humidity} %RH</p>
          <p>Paint Volume Used: {machineData.paint_volume_used} liters</p>
          <p>Solvent Concentration: {machineData.solvent_concentration} %</p>
        </>
      );
    case 'agv_003':
      return (
        <>
          <p>Battery Level: {machineData.battery_level} %</p>
          <p>Load Weight: {machineData.load_weight} kg</p>
          <p>Speed: {machineData.speed} m/s</p>
          <p>Distance Traveled: {machineData.distance_traveled} m</p>
          <p>Obstacle Detection: {machineData.obstacle_detection}</p>
          <p>Navigation Status: {machineData.navigation_status}</p>
        </>
      );
    case 'cnc_milling_004':
      return (
        <>
          <p>Spindle Speed: {machineData.spindle_speed} RPM</p>
          <p>Tool Wear Level: {machineData.tool_wear_level} %</p>
          <p>Cut Depth: {machineData.cut_depth} mm</p>
          <p>Feed Rate: {machineData.feed_rate} mm/min</p>
          <p>Power Consumption: {machineData.power_consumption} kWh</p>
        </>
      );
    case 'leak_test_005':
      return (
        <>
          <p>Test Pressure: {machineData.test_pressure} bar</p>
          <p>Pressure Drop: {machineData.pressure_drop} bar</p>
          <p>Leak Rate: {machineData.leak_rate} ml/min</p>
          <p>Test Duration: {machineData.test_duration} seconds</p>
          <p>Status: {machineData.status}</p>
          <p>Seal Condition: {machineData.seal_condition}</p>
        </>
      );
    default:
      console.error(`Unknown machine_id: ${data.machine_id}`);
      return <p>Data not available for this machine.</p>;
  }
};

export default Card;
