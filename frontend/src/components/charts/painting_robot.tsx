import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

interface DataPoint {
  time: string;
  result: string;
  atomizer_speed: number;
  booth_airflow_velocity: number;
  humidity: number;
  overspray_capture_efficiency: number;
  paint_flow_rate: number;
  paint_thickness: number;
  paint_volume_used: number;
  solvent_concentration: number;
  spray_pressure: number;
  temperature: number;
}

const painting_robot: React.FC<{ token: string }> = ({ token }) => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axios.get(`${API_DOMAIN}/api/v1/metrics?id=painting_robot_002`, {
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
                atomizer_speed,
                booth_airflow_velocity,
                humidity,
                overspray_capture_efficiency,
                paint_flow_rate,
                paint_thickness,
                paint_volume_used,
                solvent_concentration,
                spray_pressure,
                temperature,
              } = payload[0].payload;
              return (
                <div className="bg-white p-4 border border-gray-200 rounded shadow">
                  <p>
                    <strong>Atomizer Speed:</strong> {atomizer_speed} RPM
                  </p>
                  <p>
                    <strong>Booth Airflow Velocity:</strong> {booth_airflow_velocity} m/s
                  </p>
                  <p>
                    <strong>Humidity:</strong> {humidity}%
                  </p>
                  <p>
                    <strong>Overspray Capture Efficiency:</strong> {overspray_capture_efficiency}%
                  </p>
                  <p>
                    <strong>Paint Flow Rate:</strong> {paint_flow_rate} L/min
                  </p>
                  <p>
                    <strong>Paint Thickness:</strong> {paint_thickness} µm
                  </p>
                  <p>
                    <strong>Paint Volume Used:</strong> {paint_volume_used} L
                  </p>
                  <p>
                    <strong>Solvent Concentration:</strong> {solvent_concentration}%
                  </p>
                  <p>
                    <strong>Spray Pressure:</strong> {spray_pressure} bar
                  </p>
                  <p>
                    <strong>Temperature:</strong> {temperature}°C
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="atomizer_speed" stroke="#ff7300" activeDot={{ r: 8 }} name="Atomizer Speed" dot={false} />
        <Line type="monotone" dataKey="booth_airflow_velocity" stroke="#387908" name="Booth Airflow Velocity" dot={false} />
        <Line type="monotone" dataKey="humidity" stroke="#8884d8" name="Humidity" dot={false} />
        <Line type="monotone" dataKey="overspray_capture_efficiency" stroke="#ffc658" name="Overspray Capture Efficiency" dot={false} />
        <Line type="monotone" dataKey="paint_flow_rate" stroke="#82ca9d" name="Paint Flow Rate" dot={false} />
        <Line type="monotone" dataKey="paint_thickness" stroke="#d0ed57" name="Paint Thickness" dot={false} />
        <Line type="monotone" dataKey="paint_volume_used" stroke="#ff0000" name="Paint Volume Used" dot={false} />
        <Line type="monotone" dataKey="solvent_concentration" stroke="#00bfff" name="Solvent Concentration" dot={false} />
        <Line type="monotone" dataKey="spray_pressure" stroke="#ff4500" name="Spray Pressure" dot={false} />
        <Line type="monotone" dataKey="temperature" stroke="#ff1493" name="Temperature" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default painting_robot;
