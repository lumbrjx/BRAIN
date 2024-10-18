import fastify from "fastify";
import cors from "@fastify/cors";
import { dirname, join } from "path";
import { fastifyAutoload } from "@fastify/autoload";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifyHealthcheck from "fastify-healthcheck";
import configureJWT from "./config/session";
import WebSocketPlugin from '@fastify/websocket';

config();

const server = fastify({
	logger: {
		transport: {
			target: "pino-pretty",
			options: {
				translateTime: "HH:MM:ss Z",
				ignore: "pid,hostname",
			},
		},
	},
	serializerOpts: {
		rounding: "ceil",
	},
}).after(() => {
	server.log.info("Server started");
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

server
	.register(cors, {
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE"],
		// allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	})
	.after(() => {
		server.log.info("Cors enabled");
	});
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);


server.log.info("Registering plugins..");
server
	.register(fastifyAutoload, {
		dir: join(__dirname, "plugins"),
	})
	.after(() => {
		server.log.info("All plugins are ready");
	});

// server.log.info("Registering middlewares..");
// server
// 	.register(fastifyAutoload, {
// 		dir: join(__dirname, "middlewares"),
// 	})
// 	.after(() => {
// 		server.log.info("All middlewares are ready");
// 	});

server.log.info("Registering WebSocket..");
server.register(WebSocketPlugin).after(() => {
	server.log.info("WebSocket is Ready")
})


server
	.register(fastifySwagger, {
		openapi: {
			info: {
				title: "smartcar api",
				description: "Api documentation",
				version: "1.0.0",
			},
			servers: [],
			components: {
				schemas: {
					message: {
						description: "WebSocket message schema",
						properties: {
							data: {
								type: "string"
							},
							channel: {
								type: "string",
								enum: ["join"],
							}
						}
					},
				}
			}
		},
		transform: jsonSchemaTransform,
	})
	.after(() => {
		server.log.info("Swagger registered");
	});

server.register(fastifySwaggerUI, {
	routePrefix: "/api/v1/docs",
});

server
	.register(fastifyHealthcheck, {
		exposeUptime: true,
	})
	.after(() => {
		server.log.info("Health check registered");
	});

configureJWT(server);
server
	.register(fastifyAutoload, {
		dir: join(__dirname, "routes"),
		options: {
			prefix: process.env.API_VERSION,
		},
		ignoreFilter: (path) => path.includes(".def.")
	})
	.after(() => {
		server.log.info("All routes are ready");
		server.log.info("available routes");
		server.log.info(server.printRoutes());
	});
server.get(`/${process.env.API_VERSION}/`, (_request, reply) => {
	reply.send(
		`SmartCar API, check ${process.env.API_VERSION}/docs for route documentation`
	);
});


const PORT = Number(process.env.PORT) || 8080;

server.listen({ port: PORT, host: process.env.HOST }, (err, _address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
});
