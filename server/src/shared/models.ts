import { z } from "zod";

export interface LoginRequestBody {
	username: string;
	password: string;
}
export const RouteResponse = z.object({
	ok: z.boolean(),
	message: z.string().min(1),
});
export interface RouteResponseData extends z.infer<typeof RouteResponse> { }
