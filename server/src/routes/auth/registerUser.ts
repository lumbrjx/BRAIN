import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserSchema, UserSchemaData } from "./model.def";

import { ZodTypeProvider } from "fastify-type-provider-zod";
import { RouteResponse } from "src/shared/models";
import { createUserService } from "src/services/createUser";

export default async function(app: FastifyInstance) {
	const server = app.withTypeProvider<ZodTypeProvider>();
	server.post(
		"/register",
		{
			preHandler: [app.authenticate, app.guard(["SUPERUSER"])],
			schema: {
				body: UserSchema,
				description: "register new user",
				tags: ["Auth"],
				response: {
					400: RouteResponse,
					401: RouteResponse,
					500: RouteResponse,
				},
			},
		},
		async function createUserController(
			req: FastifyRequest<{ Body: UserSchemaData }>,
			reply: FastifyReply,
		) {
			try {
				const cx = await createUserService(req.body);
				if (!cx.success) {
					return reply.status(500).send({ ok: false, message: cx.error });
				}

				return reply.status(201).send({ ok: true, message: cx.data });
			} catch (error: any) {
				return reply
					.status(500)
					.send({ ok: false, message: "Internal Server Error" });
			}
		},
	);
}
export const autoPrefix = "/auth";
