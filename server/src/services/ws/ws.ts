import { WebSocket } from "@fastify/websocket";
import { channelHandlers, channelsType, unknownChannelHandler } from "./agent"
import { ChannelsSchema } from "src/routes/ws/channels";
import { FastifyRequest } from "fastify";
// import { redis } from "src/config/redis";
// import { connectionStore } from "src/config/connectionStore";

type channelsTypeKeys = keyof channelsType;


export async function handleWebSocket(connection: WebSocket, req: FastifyRequest) {

	connection.on('message', (message: string) => {
		try {

			const data = JSON.parse(message)
			const parsedData = ChannelsSchema.safeParse(data)
			if (!parsedData.success) {
				console.log(parsedData.error)
				return connection.send(JSON.stringify({ error: 'Invalid message format' }))
			}

			console.log(`Received on ${parsedData.data?.channel}: , ${parsedData.data?.data}`)

			const chan: channelsTypeKeys = parsedData.data?.channel

			const handler = channelHandlers[chan] ?? ((socket, _data) => unknownChannelHandler(socket, chan))

			handler(connection, data)

		} catch (error) {
			console.error('Error processing message:', error)
			connection.send(JSON.stringify({ error: 'Invalid message format' }))
		}
	})

	connection.on('close', async () => {
		// connectionStore.delete(socketId)

		try {
			// await redis.del(socketId)
			// req.log.info(`Deleted connection metadata for ${socketId}`)
		} catch (error) {
			req.log.error(`Failed to delete connection metadata: ${error}`)
		}

		console.log('Client disconnected')
	})
}
