import WebSocket from 'ws';
import axios from 'axios';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN1cGVydXNlcjEiLCJyb2xlIjoiU1VQRVJVU0VSIiwiaWQiOiI0MWUzOGM1Yi1mMTRhLTRkYzUtYmVjZS00NWVkODlhYTM0ZGIiLCJjcmVhdGVkX2F0IjoiMjAyNC0xMC0xOVQxNjo1ODozMS45MzRaIiwiaWF0IjoxNzI5MzU3MTIyLCJleHAiOjE3MzA2NTMxMjJ9.PXCqDKAbwUzFw9tftJxTlMDyeRdOJM9EWW7cQ_QCeoA';

const getMachines = async () => {
	try {
		const response = await axios.get('https://38c1-105-235-139-169.ngrok-free.app/api/v1/machines', {
			headers: {
				hasContentType: "application/json",
				'ngrok-skip-browser-warning': 'true',
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data)
		return response.data;
	} catch (error) {
		console.log("err", error)
		throw new Error(`Failed to fetch machines`);
	}
};

getMachines()

const ws = new WebSocket('wss://38c1-105-235-139-169.ngrok-free.app', token);

ws.onopen = () => {
	console.log('WebSocket connection opened');
};

ws.onmessage = (message) => {
	console.log('Received from server:', message.data);
};

ws.onclose = (event) => {
	console.log(`WebSocket closed: ${event.reason}`);
};

