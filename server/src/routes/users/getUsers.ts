import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { IdSchema, IdSchemaData } from "./model.def";
import { Result, parseToResult } from "src/shared/result";
import { withCursorPagination } from "drizzle-pagination"
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { RouteResponse } from "src/shared/models";
import { db } from "src/config/database";
import { users } from "src/database/schema";

export default async function(app: FastifyInstance) {
	const server = app.withTypeProvider<ZodTypeProvider>();
	server.get(
		"",
		{
			preHandler: [app.authenticate, app.guard(["SUPERUSER"])],
			schema: {
				querystring: IdSchema,
				description: "list all the users in the factory",
				summary: "get all users",
				tags: ["admin"],

				response: {
					400: RouteResponse,
					401: RouteResponse,
					500: RouteResponse,
				},
			},
		},
		async function getUsersController(
			req: FastifyRequest<{ Querystring: IdSchemaData }>,
			reply: FastifyReply,
		) {
			try {
				const cx = await getUsersService(req.query);
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

export async function getUsersService(
	req: IdSchemaData,
): Promise<
	Result<any | boolean | undefined, Error | string | undefined>
> {
	try {
		const dx = await db.query.users.findMany({
			...withCursorPagination({
				limit: Number(5),
				cursors: [[users.id, "asc", req.id]],
			}),
		});
		if (!dx) {
			return parseToResult(undefined, "Error Getting data");
		}
		return parseToResult(dx);
	} catch (error: any) {
		return parseToResult(undefined, "UNTRACKABLE");
	}
}

export const autoPrefix = "/users";
