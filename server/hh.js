import WebSocket from 'ws';


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN1cGVydXNlciIsInJvbGUiOiJTVVBFUlVTRVIiLCJpZCI6IjY0N2Q2YWJlLTg2Y2QtNDc5MC1iOTQ4LWQxM2YwMmMxYmZiMSIsImNyZWF0ZWRfYXQiOiIyMDI0LTEwLTE4VDAwOjEzOjI3Ljk2OFoiLCJpYXQiOjE3MjkyODI0NDIsImV4cCI6MTczMDU3ODQ0Mn0.KyMKt59NEuSUzu_T0i3yEs6nsUGZ41-HjUGeVvJJNdA';
const ws = new WebSocket('wss://76fc-105-235-139-169.ngrok-free.app', token);

ws.onopen = () => {
	console.log('WebSocket connection opened');
};

ws.onmessage = (message) => {
	console.log('Received from server:', message.data);
};

ws.onclose = (event) => {
	console.log(`WebSocket closed: ${event.reason}`);
};

