import { WebSocket } from "@fastify/websocket";

export function join(socket: WebSocket, data: any) {
	socket.send(JSON.stringify({ channel: 'join', status: 'success', message: 'Joined successfully', data }))
}
