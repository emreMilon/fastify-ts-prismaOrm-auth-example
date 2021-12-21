import { PrismaClient } from "@prisma/client";
import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

import { IForecast, IDecodedToken } from "../types/interfaces";

const prisma = new PrismaClient();

const token = {
  access: process.env.ACCESS_TOKEN_SECRET,
};

const forecastCtrl = {
  getForecasts: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { tokenn }: any = req.headers;
      const decoded = <IDecodedToken>jwt.verify(tokenn, `${token?.access}`);

      const { id } = decoded;
      if (!id) return reply.code(400).send({ message: "Invalid Token" });
      const forecasts: IForecast[] = await prisma.forecast.findMany();
      return reply.code(200).send({
        status: "success",
        message: "All forecasts found",
        data: forecasts,
      });
    } catch (error: any) {
      reply.code(500).send({ message: error.message });
    }
  },

  getForeCastasUser: async (req: FastifyRequest | any, reply: FastifyReply) => {
    try {
      const { id } = req.params;
      const forecasts: IForecast[] = await prisma.forecast.findMany({
        where: { userId: id },
      });
      return reply.code(200).send({
        status: "success",
        message: `forecasts found`,
        data: forecasts,
      });
    } catch (error: any) {
      reply.code(500).send({ message: error.message });
    }
  },
};

export default forecastCtrl;
