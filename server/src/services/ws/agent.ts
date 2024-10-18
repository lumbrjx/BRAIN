import { WebSocket } from "@fastify/websocket"
import { join } from "./channels/join"

export interface channelsType {
	join: (socket: WebSocket, data: any) => void;
}

export const channelHandlers: channelsType = { join }

export function unknownChannelHandler(socket: WebSocket, channel: string) {
	socket.send(JSON.stringify({ error: `Unknown channel: ${channel}` }))
}
