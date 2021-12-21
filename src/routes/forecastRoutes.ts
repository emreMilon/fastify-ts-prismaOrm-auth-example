import { RouteOptions, HookHandlerDoneFunction } from "fastify";
import {
  getForeCastsOption,
  getForeCastsasUserOption,
} from "./forecastRoutesOption";
function forecastRoutes(
  fastify: any,
  options: RouteOptions,
  done: HookHandlerDoneFunction
) {
  fastify.get("/api/forecasts", getForeCastsOption);
  fastify.get("/api/forecasts/:id", getForeCastsasUserOption);

  done();
}

export default forecastRoutes;
