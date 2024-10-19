import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

interface DataPoint {
  time: string;
  result: string;
  cycle_count: number;
  cycle_time: number; 
  die_alignment: string;
  force_applied: number; 
  lubrication_flow_rate: number; 
  noise_level: number;
  oil_pressure: number; 
  power_consumption: number; 
  sheet_thickness: number; 
  temperature: number; 
  vibration_level: number; 
}

const stamping_press: React.FC<{ token: string }> = ({ token }) => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axios.get(`${API_DOMAIN}/api/v1/metrics?id=stamping_press_001`, {
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
                cycle_count,
                cycle_time,
                die_alignment,
                force_applied,
                lubrication_flow_rate,
                noise_level,
                oil_pressure,
                power_consumption,
                sheet_thickness,
                temperature,
                vibration_level,
              } = payload[0].payload;
              return (
                <div className="bg-white p-4 border border-gray-200 rounded shadow">
                  <p>
                    <strong>Cycle Count:</strong> {cycle_count}
                  </p>
                  <p>
                    <strong>Cycle Time:</strong> {cycle_time} s
                  </p>
                  <p>
                    <strong>Die Alignment:</strong> {die_alignment}
                  </p>
                  <p>
                    <strong>Force Applied:</strong> {force_applied} N
                  </p>
                  <p>
                    <strong>Lubrication Flow Rate:</strong> {lubrication_flow_rate} L/min
                  </p>
                  <p>
                    <strong>Noise Level:</strong> {noise_level} dB
                  </p>
                  <p>
                    <strong>Oil Pressure:</strong> {oil_pressure} bar
                  </p>
                  <p>
                    <strong>Power Consumption:</strong> {power_consumption} W
                  </p>
                  <p>
                    <strong>Sheet Thickness:</strong> {sheet_thickness} mm
                  </p>
                  <p>
                    <strong>Temperature:</strong> {temperature} °C
                  </p>
                  <p>
                    <strong>Vibration Level:</strong> {vibration_level} g
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="cycle_count" stroke="#ff7300" activeDot={{ r: 8 }} name="Cycle Count" dot={false} />
        <Line type="monotone" dataKey="cycle_time" stroke="#387908" name="Cycle Time" dot={false} />
        <Line type="monotone" dataKey="force_applied" stroke="#8884d8" name="Force Applied" dot={false} />
        <Line type="monotone" dataKey="lubrication_flow_rate" stroke="#ffc658" name="Lubrication Flow Rate" dot={false} />
        <Line type="monotone" dataKey="noise_level" stroke="#82ca9d" name="Noise Level" dot={false} />
        <Line type="monotone" dataKey="oil_pressure" stroke="#d0ed57" name="Oil Pressure" dot={false} />
        <Line type="monotone" dataKey="power_consumption" stroke="#ff0000" name="Power Consumption" dot={false} />
        <Line type="monotone" dataKey="sheet_thickness" stroke="#00bfff" name="Sheet Thickness" dot={false} />
        <Line type="monotone" dataKey="temperature" stroke="#ff4500" name="Temperature" dot={false} />
        <Line type="monotone" dataKey="vibration_level" stroke="#ff1493" name="Vibration Level" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default stamping_press;
