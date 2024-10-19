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
  switch (data.machine_id) {
    case 'welding_robot_006':
      return (
        <>
          <p>Weld Temperature: {data.weld_temperature} °C</p>
          <p>Weld Current: {data.weld_current} A</p>
          <p>Weld Voltage: {data.weld_voltage} V</p>
          <p>Weld Time: {data.weld_time} ms</p>
          <p>Wire Feed Rate: {data.wire_feed_rate} mm/min</p>
          <p>Gas Flow Rate: {data.gas_flow_rate} l/min</p>
          <p>Power Consumption: {data.power_consumption} kWh</p>
        </>
      );
    case 'stamping_press_001':
      return (
        <>
          <p>Force Applied: {data.force_applied} tons</p>
          <p>Cycle Time: {data.cycle_time} seconds</p>
          <p>Temperature: {data.temperature} °C</p>
          <p>Cycle Count: {data.cycle_count}</p>
          <p>Oil Pressure: {data.oil_pressure} bar</p>
          <p>Sheet Thickness: {data.sheet_thickness} mm</p>
          <p>Power Consumption: {data.power_consumption} kWh</p>
        </>
      );
    case 'painting_robot_002':
      return (
        <>
          <p>Spray Pressure: {data.spray_pressure} bar</p>
          <p>Paint Thickness: {data.paint_thickness} μm</p>
          <p>Temperature: {data.temperature} °C</p>
          <p>Humidity: {data.humidity} %RH</p>
          <p>Paint Volume Used: {data.paint_volume_used} liters</p>
          <p>Solvent Concentration: {data.solvent_concentration} %</p>
        </>
      );
    case 'agv_003':
      return (
        <>
          <p>Battery Level: {data.battery_level} %</p>
          <p>Load Weight: {data.load_weight} kg</p>
          <p>Speed: {data.speed} m/s</p>
          <p>Distance Traveled: {data.distance_traveled} m</p>
          <p>Obstacle Detection: {data.obstacle_detection}</p>
          <p>Navigation Status: {data.navigation_status}</p>
        </>
      );
    case 'cnc_milling_004':
      return (
        <>
          <p>Spindle Speed: {data.spindle_speed} RPM</p>
          <p>Tool Wear Level: {data.tool_wear_level} %</p>
          <p>Cut Depth: {data.cut_depth} mm</p>
          <p>Feed Rate: {data.feed_rate} mm/min</p>
          <p>Power Consumption: {data.power_consumption} kWh</p>
        </>
      );
    case 'leak_test_005':
      return (
        <>
          <p>Test Pressure: {data.test_pressure} bar</p>
          <p>Pressure Drop: {data.pressure_drop} bar</p>
          <p>Leak Rate: {data.leak_rate} ml/min</p>
          <p>Test Duration: {data.test_duration} seconds</p>
          <p>Status: {data.status}</p>
          <p>Seal Condition: {data.seal_condition}</p>
        </>
      );
    default:
      console.error(`Unknown machine_id: ${data.machine_id}`);
      return <p>Data not available for this machine.</p>;
  }
};

export default Card;