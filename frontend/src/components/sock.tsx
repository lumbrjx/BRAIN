import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/auth/authWrapper';
import Card from './card';
import { toast } from "sonner"

type MachineData = {
  machine_id: string;
  [key: string]: any;
};

const WebSocketConsoleLogger: React.FC = () => {
  const ws = useRef<WebSocket | null>(null);
  const { token } = useAuth();
  const [leakTestData, setLeakTestData] = useState<[MachineData, string] | null>(null);
  const [stampingPressData, setStampingPressData] = useState<[MachineData, string] | null>(null);
  const [paintingRobotData, setPaintingRobotData] = useState<[MachineData, string] | null>(null);
  const [cncMillingData, setCncMillingData] = useState<[MachineData, string] | null>(null);
  const [weldingRobotData, setWeldingRobotData] = useState<[MachineData, string] | null>(null);
  const [agvData, setAgvData] = useState<[MachineData, string] | null>(null);
  useEffect(() => {
    if (!token) return;
    const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;
    const wsUrl = API_DOMAIN?.replace("https://","wss://")
    const socketUrl = `${wsUrl}/api/v1/ws/channels?token=${token}`;
    ws.current = new WebSocket(socketUrl, token);

    ws.current.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.current.onmessage = (message: MessageEvent) => {
      const parsedData = JSON.parse(message.data);
      console.log(parsedData)
      if(parsedData.type == "JOB"){ 
        console.log(parsedData.type)
        toast.error("JOB todo now", {
          description: parsedData.data,
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })

    } 
    
    else if(parsedData.type == "FLOG"  ){ 
      console.log(parsedData.type)
      toast("JOB added for later", {
        description: parsedData.data,
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      })
  } 
    else {
      const newData = parsedData.data.metrics;
      switch (newData.machine_id) {
        case 'leak_test_005':
          setLeakTestData([newData, parsedData.type]);
          break;
        case 'stamping_press_001':
          setStampingPressData([newData, parsedData.type]);
          break;
        case 'painting_robot_002':
          setPaintingRobotData([newData, parsedData.type]);
          break;
        case 'cnc_milling_004':
          setCncMillingData([newData, parsedData.type]);
          break;
        case 'welding_robot_006':
          setWeldingRobotData([newData, parsedData.type]);
          break;
        case 'agv_003':
          setAgvData([newData, parsedData.type]);
          break;
      }
    };
  }
    ws.current.onclose = (event: CloseEvent) => {
      console.log(`WebSocket closed: ${event.reason}`);
    };

    return () => {
      ws.current?.close();
    };
  }, [token]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">

      {leakTestData && (
        <div className="w-full" key="leak_test">
          <Card data={leakTestData[0]} type={leakTestData[1]} />
        </div>
      )}
      {stampingPressData && (
        <div className="w-full" key="stamping_press">
          <Card data={stampingPressData[0]} type={stampingPressData[1]} />
        </div>
      )}
      {paintingRobotData && (
        <div className="w-full" key="painting_robot">
          <Card data={paintingRobotData[0]} type={paintingRobotData[1]} />
        </div>
      )}
      {cncMillingData && (
        <div className="w-full" key="cnc_milling">
          <Card data={cncMillingData[0]} type={cncMillingData[1]} />
        </div>
      )}
      {weldingRobotData && (
        <div className="w-full" key="welding_robot">
          <Card data={weldingRobotData[0]} type={weldingRobotData[1]} />
        </div>
      )}
      {agvData && (
        <div className="w-full" key="agv">
          <Card data={agvData[0]} type={agvData[1]} />
        </div>
      )}
    </div>
  );
};

export default WebSocketConsoleLogger;