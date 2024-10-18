import { FastifyJWT } from "@fastify/jwt";
import { FastifyRequest } from "fastify";

export default async function decodeToken(req: FastifyRequest, token: string) {
	const decoded = req.jwt.verify<FastifyJWT["user"]>(token as string);
	return decoded;
}
