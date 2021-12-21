import { RouteOptions, HookHandlerDoneFunction } from "fastify";
import { getCustomesOption } from "./customerRoutesOptions";
function customerRoutes(
  fastify: any,
  options: RouteOptions,
  done: HookHandlerDoneFunction
) {
  fastify.get("/api/customers", getCustomesOption);

  done();
}

export default customerRoutes;
