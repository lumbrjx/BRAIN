import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Result, parseToResult } from "src/shared/result";

import { ZodTypeProvider } from "fastify-type-provider-zod";
import { RouteResponse } from "src/shared/models";
import { getPowerConsumptionByMachine } from "src/services/getConsumption";

export default async function(app: FastifyInstance) {
	const server = app.withTypeProvider<ZodTypeProvider>();
	server.get(
		"/usage",
		{
			// preHandler: [app.authenticate],
			schema: {
				description: "get last 15 minutes overall factory usage",
				summary: "factory usage",
				tags: ["Metrics"],

				response: {
					400: RouteResponse,
					401: RouteResponse,
					500: RouteResponse,
				},
			},
		},
		async function getUsageController(
			_req: FastifyRequest,
			reply: FastifyReply,
		) {
			try {
				const cx = await getUsageService();
				if (!cx.success) {
					return reply.status(500).send({ ok: false, message: cx.error });
				}

				return reply.status(200).send({ ok: true, message: cx.data });
			} catch (error: any) {
				return reply
					.status(500)
					.send({ ok: false, message: "Internal Server Error" });
			}
		},
	);
}
export async function getUsageService(): Promise<Result<any | boolean | undefined, Error | string | undefined>> {
	try {
		const metrics = await getPowerConsumptionByMachine()
		return parseToResult(metrics)
	} catch (error: any) {
		return parseToResult(undefined, "ROLLBACK");
	}
}

export const autoPrefix = "/metrics";
