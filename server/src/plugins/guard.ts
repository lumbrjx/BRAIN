import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { fastifyPlugin } from "fastify-plugin";

type RolesType = "SUPERUSER" | "OPERATOR" | "MAINTAINER" ;

declare module "fastify" {
  export interface FastifyInstance {
    guard: (roles: RolesType[]) => void;
  }
}

const guard = async (app: FastifyInstance) => {
  app.decorate("guard", function (roles: RolesType[]) {
    return async (req: FastifyRequest, reply: FastifyReply) => {
      const decoded = req.user;
	  console.log(roles)
	  console.log(decoded.role)
      const accessDenied = roles.includes(decoded.role);
	  console.log(accessDenied)
      if (!accessDenied) {
        return reply.code(403).send({
          ok: false,
          message: "access denied, you don't have the access rights",
        });
      }
    };
  });
};

export default fastifyPlugin(guard);
