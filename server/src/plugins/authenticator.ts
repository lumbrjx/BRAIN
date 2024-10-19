import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { fastifyPlugin } from "fastify-plugin";
import {  JWT } from "@fastify/jwt";
import { UsersTableSchema } from "src/database/models";
import { z } from "zod";
import jwt from "jsonwebtoken"

declare module "fastify" {
	interface FastifyRequest {
		jwt: JWT;
		authenticateReq: any;
	}
	export interface FastifyInstance {
		authenticate: any;
	}
}

export const payloadSchema = UsersTableSchema.omit({
	password: true
});
export interface payloadType extends z.infer<typeof payloadSchema> { }

export type ResetPayload = {
	tokenId: string;
};
declare module "@fastify/jwt" {
	interface FastifyJWT {
		user: payloadType;
		tokenId: ResetPayload;
	}
}
const authenticator = async (app: FastifyInstance) => {
	app.decorate(
		"authenticate",
		async (req: FastifyRequest, reply: FastifyReply) => {
			const authHeader = req.headers['authorization'];
			if (!authHeader || !authHeader.startsWith('Bearer ')) {
				return reply
					.status(401)
					.send({ ok: false, message: "Authentication required" });
			}
			const token = authHeader.substring(7);

			try {
				const decoded = jwt.verify(token, process.env.SECRET);
				req.user = decoded as payloadType;
			} catch (error) {
				return reply
					.status(401)
					.send({ ok: false, message: "Invalid token" });
			}
		}
	);
 
};
export default fastifyPlugin(authenticator);
