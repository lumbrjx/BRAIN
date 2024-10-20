import { ConnectionMetadata, connectionStore } from "src/config/connectionStore";
import type { FastifyInstance, FastifyRequest } from "fastify";
import { fastifyPlugin } from "fastify-plugin";
import { WebSocket, WebSocketServer } from "ws";
import { redis, redisPubSub } from "src/config/redis";
import jwt from "jsonwebtoken"
import { payloadType } from "./authenticator";

export const websocket = async (app: FastifyInstance) => {

	const wss = new WebSocketServer({ server: app.server })
	redisPubSub.subscribe("ALERT_CHANNEL")
	redisPubSub.on('message', async (channel, message) => {
		console.log(`Received message from channel ${channel}: ${message}`);

		try {
			const superUserKeys = await redis.keys('SUPERUSER-*');
			const operatorKeys = await redis.keys('MAINTAINER-*');

			const users = [...superUserKeys, ...operatorKeys];
			const clients = users.map((user) => connectionStore.get(user));

			if (!clients || clients.length === 0) {
				console.log("No clients connected");
				return;
			}
			console.log(clients.length)

			clients.forEach((client) => {
				if (client?.readyState === WebSocket.OPEN) {
					client.send(message  );
				}
			});
		} catch (e) {
			console.error('Error sending message to clients:', e);
		}

	});

	wss.on('connection', async (ws: WebSocket, req: FastifyRequest) => {
		const authHeader = req.headers['sec-websocket-protocol'];
		if (!authHeader) {
			return ws.close(4000, "Authentication required")
		}

		let socketId: string;


		try {
			const decoded = jwt.verify(authHeader, process.env.SECRET)
			req.user = decoded as payloadType;
			const role = req.user.role
			const userId = req.user.id
			socketId = `${role}-${userId}`
			connectionStore.set(socketId, ws)

			const metadata: ConnectionMetadata = {
				userId,
				role,
				connectedAt: new Date(),
				status: 'connected'
			}
			await redis.set(socketId, JSON.stringify(metadata))
			console.log(`Stored connection metadata for ${socketId}`)
			console.log('Client connected');


		} catch (error) {
			console.log(error)
			return ws.close(4000, "ERR")
		}




		ws.on('close', async () => {
			connectionStore.delete(socketId)

			try {
				await redis.del(socketId)
				req.log.info(`Deleted connection metadata for ${socketId}`)
			} catch (error) {
				req.log.error(`Failed to delete connection metadata: ${error}`)
			}

			console.log('Client disconnected')

		});
	});
};
export default fastifyPlugin(websocket);


