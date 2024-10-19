import React, { useEffect, useRef } from 'react';
import { useAuth } from '@/auth/authWrapper';

interface WebSocketConsoleLoggerProps {
  onDataReceived: (data: any) => void; 
}

const WebSocketConsoleLogger: React.FC<WebSocketConsoleLoggerProps> = ({onDataReceived}) => {
  const ws = useRef<WebSocket | null>(null);
  const {token}  = useAuth();
  useEffect(() => {
    const socketUrl = 'wss://brain-production-0450.up.railway.app/api/v1/ws/channels';
    
    const authToken = token;

    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      console.log('WebSocket connection established');
      socket.send(JSON.stringify({ type: 'authentication', token: authToken }));
    };

    socket.onmessage = (event) => {
      console.log('Received data:', event.data);
      const receivedData = JSON.parse(event.data)
      onDataReceived(receivedData)
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.current = socket;

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [onDataReceived]);

  return <h1>machines</h1>;
};

export default WebSocketConsoleLogger;