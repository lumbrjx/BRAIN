import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { MachinesResponse } from "./model.def";

import { ZodTypeProvider } from "fastify-type-provider-zod";
import { RouteResponse } from "src/shared/models";
import { getAllMachinesService } from "src/services/getAllMachines";

export default async function(app: FastifyInstance) {
	const server = app.withTypeProvider<ZodTypeProvider>();
	server.get(
		"",
		{
			preHandler: [app.authenticate],
			schema: {
				description: "get All facotry machines",
				summary: "machines",
				tags: ["core"],

				response: {
					200: MachinesResponse,
					400: RouteResponse,
					401: RouteResponse,
					500: RouteResponse,
				},
			},
		},
		async function getMachinesController(
			_req: FastifyRequest,
			reply: FastifyReply,
		) {
			try {
				const cx = await getAllMachinesService();
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


export const autoPrefix = "/machines";
