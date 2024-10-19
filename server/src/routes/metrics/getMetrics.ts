import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { IdSchema, IdSchemaData } from "./model.def";
import { Result, parseToResult } from "src/shared/result";

import { ZodTypeProvider } from "fastify-type-provider-zod";
import { RouteResponse } from "src/shared/models";
import { getLogs } from "src/services/getLogs";

export default async function(app: FastifyInstance) {
	const server = app.withTypeProvider<ZodTypeProvider>();
	server.get(
		"",
		{
			schema: {
				querystring: IdSchema,
				description: "get last 15 minutes machines metrics",
				summary: "machines metrics",
				tags: ["Metrics"],

				response: {
					400: RouteResponse,
					401: RouteResponse,
					500: RouteResponse,
				},
			},
		},
		async function getMetricsController(
			req: FastifyRequest<{ Querystring: IdSchemaData }>,
			reply: FastifyReply,
		) {
			try {
				const cx = await getMetricsService(req.query);
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
export async function getMetricsService(
	x: IdSchemaData,
): Promise<Result<any | boolean | undefined, Error | string | undefined>> {
	try {
		const metrics = await getLogs(x.id)
		console.log(metrics)
		return parseToResult(metrics)
	} catch (error: any) {
		return parseToResult(undefined, "ROLLBACK");
	}
}

export const autoPrefix = "/metrics";
