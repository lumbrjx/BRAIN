import type { FastifyInstance } from "fastify";
import { fastifyPlugin } from "fastify-plugin";

const errorHandlerPlugin = async (fastify: FastifyInstance) => {
	// Handle and parse ZodErrors
	fastify.setErrorHandler((error, _request, reply) => {
		if (error instanceof Error && error.constructor.name === "ZodError") {
			reply.status(400).send({
				success: false,
				message: error.message,
			});
			return;
		}
	});
};


export default fastifyPlugin(errorHandlerPlugin);
