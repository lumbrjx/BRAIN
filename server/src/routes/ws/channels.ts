import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { handleWebSocket } from "src/services/ws/ws";

import { z } from "zod";


export const ChannelsSchema= z.object({
  channel: z.enum(["join"]),
  data: z.string().min(1)
});

export interface ChannelsData extends z.infer<typeof ChannelsSchema> {}
export default async function(app: FastifyInstance) {
	const server = app.withTypeProvider<ZodTypeProvider>();
	server.get(
		"/channels",
		{
			websocket: true,
			preHandler: server.authenticate,
			schema: {
				description: "WebSockets channels route, check message schema down below for endpoint definition.",
				tags: ["Room"],
				summary: "WebSocket channels",
			},
		},
		handleWebSocket,
	);
}

export const autoPrefix = "/ws";
