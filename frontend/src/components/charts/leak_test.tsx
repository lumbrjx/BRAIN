import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

interface DataPoint {
  time: string;
  fluid_type: string;
  leak_rate: number;
  pressure_drop: number;
  temperature: number;
  seal_condition: string;
  status: string;
  test_cycle_count: number;
  test_duration: number;
  test_pressure: number;
}

const fluidColors: { [key: string]: string } = {
  oil: '#FFA500',
  air: '#87CEEB',
  water: '#1E90FF',
  coolant: '#32CD32',
  'hydraulic fluid': '#FF69B4',
};

interface LeakRatePressureDropChartProps {
  token: string;
}

const LeakRatePressureDropChart: React.FC<LeakRatePressureDropChartProps> = ({ token }) => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axios.get(`${API_DOMAIN}/api/v1/metrics?id=leak_test_005`, {
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
                fluid_type,
                leak_rate,
                pressure_drop,
                temperature,
                seal_condition,
                status,
                test_cycle_count,
                test_duration,
                test_pressure,
              } = payload[0].payload;
              return (
                <div className="bg-white p-4 border border-gray-200 rounded shadow">
                  <p>
                    <strong>Fluid Type:</strong> {fluid_type}
                  </p>
                  <p>
                    <strong>Leak Rate:</strong> {leak_rate}
                  </p>
                  <p>
                    <strong>Pressure Drop:</strong> {pressure_drop}
                  </p>
                  <p>
                    <strong>Temperature:</strong> {temperature}°C
                  </p>
                  <p>
                    <strong>Seal Condition:</strong> {seal_condition}
                  </p>
                  <p>
                    <strong>Status:</strong> {status}
                  </p>
                  <p>
                    <strong>Test Cycle Count:</strong> {test_cycle_count}
                  </p>
                  <p>
                    <strong>Test Duration:</strong> {test_duration}
                  </p>
                  <p>
                    <strong>Test Pressure:</strong> {test_pressure}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
        {Object.entries(fluidColors).map(([fluidType, color]) => (
          <Line
            key={fluidType}
            type="monotone"
            dataKey="pressure_drop"
            stroke={color}
            activeDot={{ r: 8 }}
            name={fluidType}
            dot={false}
            data={data.filter((item) => item.fluid_type === fluidType)}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LeakRatePressureDropChart;
