import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

interface DataPoint {
  time: string;
  result: string;
  battery_level: number;
  distance_traveled: number;
  load_weight: number;
  navigation_status: string;
  obstacle_detection: string;
  speed: number;
  temperature: number;
  vibration_level: number;
  wheel_rotation_speed: number;
}

const Agv: React.FC<{ token: string }> = ({ token }) => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const API_DOMAIN = import.meta.env.VITE_API_DOMAIN

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axios.get(`${API_DOMAIN}/api/v1/metrics?id=agv_003`, {
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
                battery_level,
                distance_traveled,
                load_weight,
                navigation_status,
                obstacle_detection,
                speed,
                temperature,
                vibration_level,
                wheel_rotation_speed,
              } = payload[0].payload;
              return (
                <div className="bg-white p-4 border border-gray-200 rounded shadow">
                  <p>
                    <strong>Battery Level:</strong> {battery_level}%
                  </p>
                  <p>
                    <strong>Distance Traveled:</strong> {distance_traveled} km
                  </p>
                  <p>
                    <strong>Load Weight:</strong> {load_weight} kg
                  </p>
                  <p>
                    <strong>Navigation Status:</strong> {navigation_status}
                  </p>
                  <p>
                    <strong>Obstacle Detection:</strong> {obstacle_detection}
                  </p>
                  <p>
                    <strong>Speed:</strong> {speed} m/s
                  </p>
                  <p>
                    <strong>Temperature:</strong> {temperature}°C
                  </p>
                  <p>
                    <strong>Vibration Level:</strong> {vibration_level}
                  </p>
                  <p>
                    <strong>Wheel Rotation Speed:</strong> {wheel_rotation_speed} RPM
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="speed" stroke="#ff7300" activeDot={{ r: 8 }} name="Speed" dot={false} />
        <Line type="monotone" dataKey="temperature" stroke="#387908" name="Temperature" dot={false} />
        <Line type="monotone" dataKey="battery_level" stroke="#8884d8" name="Battery Level" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Agv;
