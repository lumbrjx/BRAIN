import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

interface DataPoint {
  time: string;
  result: string;
  gas_flow_rate: number;
  power_consumption: number;
  pressure_applied: number;
  vibration_level: number;
  weld_current: number;
  weld_strength_estimate: number;
  weld_temperature: number;
  weld_time: number; // in seconds
  weld_voltage: number;
  wire_feed_rate: number;
}

const welding_robot: React.FC<{ token: string }> = ({ token }) => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axios.get(`${API_DOMAIN}/api/v1/metrics?id=welding_robot_006`, {
            headers: {
              'ngrok-skip-browser-warning': '69420',
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.ok) {
            setData(response.data.message);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [token]);

  const formatTimeToHourAndMinutes = (time: string) => {
    const date = new Date(time);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  if (loading) {
    return <p>Loading chart data...</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey="time" tickFormatter={formatTimeToHourAndMinutes} />
        <YAxis />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const {
                gas_flow_rate,
                power_consumption,
                pressure_applied,
                vibration_level,
                weld_current,
                weld_strength_estimate,
                weld_temperature,
                weld_time,
                weld_voltage,
                wire_feed_rate,
              } = payload[0].payload;
              return (
                <div className="bg-white p-4 border border-gray-200 rounded shadow">
                  <p>
                    <strong>Gas Flow Rate:</strong> {gas_flow_rate} L/min
                  </p>
                  <p>
                    <strong>Power Consumption:</strong> {power_consumption} W
                  </p>
                  <p>
                    <strong>Pressure Applied:</strong> {pressure_applied} Pa
                  </p>
                  <p>
                    <strong>Vibration Level:</strong> {vibration_level}
                  </p>
                  <p>
                    <strong>Weld Current:</strong> {weld_current} A
                  </p>
                  <p>
                    <strong>Weld Strength Estimate:</strong> {weld_strength_estimate} N
                  </p>
                  <p>
                    <strong>Weld Temperature:</strong> {weld_temperature} °C
                  </p>
                  <p>
                    <strong>Weld Time:</strong> {weld_time} s
                  </p>
                  <p>
                    <strong>Weld Voltage:</strong> {weld_voltage} V
                  </p>
                  <p>
                    <strong>Wire Feed Rate:</strong> {wire_feed_rate} m/min
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="gas_flow_rate" stroke="#ff7300" activeDot={{ r: 8 }} name="Gas Flow Rate" dot={false} />
        <Line type="monotone" dataKey="power_consumption" stroke="#387908" name="Power Consumption" dot={false} />
        <Line type="monotone" dataKey="pressure_applied" stroke="#8884d8" name="Pressure Applied" dot={false} />
        <Line type="monotone" dataKey="vibration_level" stroke="#ffc658" name="Vibration Level" dot={false} />
        <Line type="monotone" dataKey="weld_current" stroke="#82ca9d" name="Weld Current" dot={false} />
        <Line type="monotone" dataKey="weld_strength_estimate" stroke="#d0ed57" name="Weld Strength Estimate" dot={false} />
        <Line type="monotone" dataKey="weld_temperature" stroke="#ff0000" name="Weld Temperature" dot={false} />
        <Line type="monotone" dataKey="weld_time" stroke="#00bfff" name="Weld Time" dot={false} />
        <Line type="monotone" dataKey="weld_voltage" stroke="#ff4500" name="Weld Voltage" dot={false} />
        <Line type="monotone" dataKey="wire_feed_rate" stroke="#ff1493" name="Wire Feed Rate" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default welding_robot;
