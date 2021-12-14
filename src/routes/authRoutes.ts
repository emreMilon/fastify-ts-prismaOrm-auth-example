import { RouteOptions, HookHandlerDoneFunction } from "fastify";
import {
  registerOptions,
  getUsersOptions,
  activeAccountOptions,
  loginOptions,
  refreshCookiesOptions,
  logoutOptions,
} from "./authRoutesOptions";

function authRoutes(
  fastify: any,
  options: RouteOptions,
  done: HookHandlerDoneFunction
) {
  fastify.get("/api/users", getUsersOptions);
  fastify.post("/api/register", registerOptions);
  fastify.post("/api/active", activeAccountOptions);
  fastify.post("/api/login", loginOptions);
  fastify.get("/api/refresh_token", refreshCookiesOptions);
  fastify.get("/api/logout", logoutOptions);
  // fastify.put("/api/userUpdate/:id")
  // fastify.delete("/api/userDelete/:id")

  done();
}

export default authRoutes;
