import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

interface DataPoint {
  time: string;
  result: string;
  chip_load: number;
  coolant_flow_rate: number;
  cut_depth: number;
  feed_rate: number;
  material_hardness: number;
  power_consumption: number;
  spindle_speed: number;
  temperature: number;
  tool_wear_level: number;
  vibration_level: number;
}

const cnc_miling: React.FC<{ token: string }> = ({ token }) => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axios.get(`${API_DOMAIN}/api/v1/metrics?id=cnc_milling_004`, {
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
                chip_load,
                coolant_flow_rate,
                cut_depth,
                feed_rate,
                material_hardness,
                power_consumption,
                spindle_speed,
                temperature,
                tool_wear_level,
                vibration_level,
              } = payload[0].payload;
              return (
                <div className="bg-white p-4 border border-gray-200 rounded shadow">
                  <p>
                    <strong>Chip Load:</strong> {chip_load} mm/tooth
                  </p>
                  <p>
                    <strong>Coolant Flow Rate:</strong> {coolant_flow_rate} L/min
                  </p>
                  <p>
                    <strong>Cut Depth:</strong> {cut_depth} mm
                  </p>
                  <p>
                    <strong>Feed Rate:</strong> {feed_rate} mm/min
                  </p>
                  <p>
                    <strong>Material Hardness:</strong> {material_hardness} HRC
                  </p>
                  <p>
                    <strong>Power Consumption:</strong> {power_consumption} W
                  </p>
                  <p>
                    <strong>Spindle Speed:</strong> {spindle_speed} RPM
                  </p>
                  <p>
                    <strong>Temperature:</strong> {temperature}°C
                  </p>
                  <p>
                    <strong>Tool Wear Level:</strong> {tool_wear_level}%
                  </p>
                  <p>
                    <strong>Vibration Level:</strong> {vibration_level}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="chip_load" stroke="#ff7300" activeDot={{ r: 8 }} name="Chip Load" dot={false} />
        <Line type="monotone" dataKey="coolant_flow_rate" stroke="#387908" name="Coolant Flow Rate" dot={false} />
        <Line type="monotone" dataKey="feed_rate" stroke="#8884d8" name="Feed Rate" dot={false} />
        <Line type="monotone" dataKey="power_consumption" stroke="#ffc658" name="Power Consumption" dot={false} />
        <Line type="monotone" dataKey="spindle_speed" stroke="#82ca9d" name="Spindle Speed" dot={false} />
        <Line type="monotone" dataKey="temperature" stroke="#d0ed57" name="Temperature" dot={false} />
        <Line type="monotone" dataKey="tool_wear_level" stroke="#ff0000" name="Tool Wear Level" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default cnc_miling;
