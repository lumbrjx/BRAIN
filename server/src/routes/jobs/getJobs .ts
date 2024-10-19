import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { JobsResponse } from "./model.def";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { RouteResponse } from "src/shared/models";
import { getJobsService } from "src/services/getJobs";

export default async function (app: FastifyInstance) {
  const server = app.withTypeProvider<ZodTypeProvider>();
  server.get(
    "",
    {
      schema: {
        description: "get all the cron jobs",
        summary: "cron jobs",
        tags: ["Core"],

        response: {
          200: JobsResponse,
          400: RouteResponse,
          401: RouteResponse,
          500: RouteResponse,
        },
      },
    },
    async function getJobsController(
      _req: FastifyRequest,
     reply: FastifyReply,
    ) {
      try {
        const cx = await getJobsService();
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
export const autoPrefix = "/jobs";
