import { FastifyInstance } from "fastify";
import fjwt from "@fastify/jwt";
import fCookie from "@fastify/cookie";
import { JWT } from "@fastify/jwt";
declare module "fastify" {
	interface FastifyRequest {
		jwt: JWT;
	}
}
declare module "fastify" {
	interface Session {
		authenticated: boolean;
		email: string;
	}
}
async function configureJWT(fastify: FastifyInstance) {
	fastify.register(fjwt, {
		sign: {
			expiresIn: "15d"
		},
		secret: process.env.SESSION_SECRET,
	});
	fastify.addHook("preHandler", (req, _res, next) => {
		req.jwt = fastify.jwt;
		return next();
	});
	fastify.register(fCookie, {
		secret: process.env.SECRET,
		hook: "preHandler",
	});
}
export default configureJWT;
