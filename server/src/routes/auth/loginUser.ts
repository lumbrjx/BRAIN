import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserLoginSchema, UserLoginSchemaData } from "./model.def";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { RouteResponse } from "src/shared/models";
import { loginUserService } from "src/services/loginUser";
import jwt from "jsonwebtoken";

export default async function(app: FastifyInstance) {
	const server = app.withTypeProvider<ZodTypeProvider>();
	server.post(
		"/login",
		{
			schema: {
				body: UserLoginSchema,
				description: "login user",
				tags: ["Auth"],
				response: {
					400: RouteResponse,
					401: RouteResponse,
					500: RouteResponse,
				},
			},
		},
		async function loginUserController(
			req: FastifyRequest<{ Body: UserLoginSchemaData }>,
			reply: FastifyReply,
		) {
			try {
				const cx = await loginUserService(req.body);
				if (!cx.success) {
					return reply.status(500).send({ ok: false, message: cx.error });
				}

				console.log(cx.data)
				const token = jwt.sign({
					username: cx.data.username,
					role: cx.data.role,
					id: cx.data.id,
					created_at: cx.data.created_at
				}, process.env.SECRET, { expiresIn: "15d" });
				// reply.setCookie(process.env.TOKEN_NAME, token, {
				// 	path: "/",
				// 	httpOnly: true,
				// 	secure: false,
				// 	maxAge: 1728000,
				// });
				return reply.status(200).send({
					success: true, data: {
						token: token, user: {
							username: cx.data.username,
							role: cx.data.role,
							created_at: cx.data.created_at
						}
					}
				});
			} catch (error: any) {
				return reply
					.status(500)
					.send({ ok: false, message: "Internal Server Error" });
			}
		},
	);
}
export const autoPrefix = "/auth";
