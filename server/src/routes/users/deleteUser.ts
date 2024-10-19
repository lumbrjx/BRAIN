import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { IdSchema, IdSchemaDatadel } from "./model.def";
import { Result, parseToResult } from "src/shared/result";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { RouteResponse } from "src/shared/models";
import { db } from "src/config/database";
import { users } from "src/database/schema";
import { eq } from "drizzle-orm";

export default async function(app: FastifyInstance) {
	const server = app.withTypeProvider<ZodTypeProvider>();
	server.delete(
		"/user",
		{
			preHandler: [app.authenticate, app.guard(["SUPERUSER"])],
			schema: {
				querystring: IdSchema,
				description: "delete a user from the platform",
				summary: "delete user",
				tags: ["admin"],

				response: {
					400: RouteResponse,
					401: RouteResponse,
					500: RouteResponse,
				},
			},
		},
		async function delUserController(
			req: FastifyRequest<{ Querystring: IdSchemaDatadel }>,
			reply: FastifyReply,
		) {
			try {
				const cx = await delUserService(req.query);
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

export async function delUserService(
	req: IdSchemaDatadel,
): Promise<
	Result<any | boolean | undefined, Error | string | undefined>
> {
	try {
		const dx = await db.delete(users).where(eq(users.id, req.id)).returning().then((s) => s[0]);
		if (!dx) {
			return parseToResult(undefined, "Error Getting data");
		}
		return parseToResult(dx);
	} catch (error: any) {
		return parseToResult(undefined, "UNTRACKABLE");
	}
}

export const autoPrefix = "/users";
