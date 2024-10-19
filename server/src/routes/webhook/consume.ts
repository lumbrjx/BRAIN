import { ZodTypeProvider } from "fastify-type-provider-zod";
import { RouteResponse } from "src/shared/models";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { redis } from "src/config/redis";
import { connectionStore } from "src/config/connectionStore";
import { ObserveState } from "src/services/decision";
import { recordLogs } from "src/services/recordLogs";
import { extractNumericValues, predict } from "src/services/analyseState";
// import { recordLogs } from "src/services/recordLogs";
// import { getLogs } from "src/services/getLogs";

export default async function(app: FastifyInstance) {
	const server = app.withTypeProvider<ZodTypeProvider>();
	server.post(
		"/consume",
		{
			schema: {
				description: "machines callback consumer",
				tags: ["core"],
				response: {
					400: RouteResponse,
					401: RouteResponse,
					500: RouteResponse,
				},
			},
		},
		async function consumeMachineState(
			req: FastifyRequest,
			reply: FastifyReply,
		) {
			try {
				// needs api key for protection, sadly DevFest webhook doesnt provide this.
				const superUserKeys = await redis.keys('SUPERUSER-*');
				const operatorKeys = await redis.keys('OPERATOR-*');

				const users = [...superUserKeys, ...operatorKeys];
				console.log(users)
				const clients = users.map((user) => connectionStore.get(user))
				if (!clients) {
					return reply.code(503).send({ error: 'No WebSocket clients connected' })

				}
				const vals = extractNumericValues(req.body);
				const features = { features: vals }
				const data = await predict(features);

				const bd = { ...data, metrics: req.body }


				if (clients.length === 0) {
					return reply.code(503).send({ error: 'No WebSocket clients connected' })
				}
				clients.forEach(client => {
					if (client?.readyState === 1) {
							console.log(bd)
						client.send(JSON.stringify({ data: bd, type: data.predicted === "no Fail" ? "LOG" : "ALERT" }))
						 // client.send(JSON.stringify({ data: bd, type:  "LOG"  }))
					}
				})
				await recordLogs(req.body)
				await ObserveState(req.body)



				return reply.status(200).send({
					success: true, data: req.body

				});
			} catch (err) {
				return reply
					.status(500)
					.send({ ok: false, message: "Internal Server Error" });
			}
		},
	);
}
export const autoPrefix = "/webhook";
