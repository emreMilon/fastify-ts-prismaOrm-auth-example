import { PrismaClient } from "@prisma/client";
import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser, IDecodedToken } from "../types/interfaces";
import generateToken from "../config/generateToken";

const token = {
  active: process.env.ACTIVE_TOKEN_SECRET,
  refresh: process.env.REFRESH_TOKEN_SECRET,
};

const prisma = new PrismaClient();

const authCtrl = {
  register: async (req: FastifyRequest, reply: FastifyReply) => {
    const { userId, firstName, lastName, position, email, password } = <IUser>(
      req.body
    );
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (user)
      return reply.code(400).send({ msg: "This email is already registered" });
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      const user: IUser = {
        userId,
        firstName,
        lastName,
        position,
        email,
        password: hashedPassword,
      };

      const activeToken = generateToken.active({ user });

      reply.code(200).send({
        status: "success",
        message: "Please active your account",
        data: user,
        activeToken,
      });
    } catch (err: any) {
      reply.code(500).send({ message: err.message });
    }
  },
  getUsers: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const users: IUser[] = await prisma.user.findMany();
      return reply.code(200).send({
        status: "success",
        message: "All users found",
        data: users,
      });
    } catch (error: any) {
      reply.code(500).send({ message: error.message });
    }
  },
  activeAccount: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { active_token }: any = req.body;
      const decoded = <IDecodedToken>(
        jwt.verify(active_token, `${token.active}`)
      );
      const { user } = decoded;

      if (!user) return reply.code(400).send({ message: "Invalid Token" });

      await prisma.user.create({
        data: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          position: user.position,
          email: user.email,
          password: user.password,
        },
      });

      reply.code(200).send({ message: "Account has been activated" });
    } catch (error: any) {
      reply.code(500).send({ message: error.message });
    }
  },
  login: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { email, password } = <IUser>req.body;
      const user = await prisma.user.findUnique({ where: { email: email } });
      if (!user)
        return reply
          .code(400)
          .send({ message: "This account does not exist." });

      // if user exists

      loginUser(user, password, reply);
    } catch (error: any) {
      return reply.code(500).send({ message: error.message });
    }
  },
  refreshToken: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      console.log(rf_token);
      if (!rf_token)
        return reply.code(400).send({ message: "Please login now!" });
      const decoded = <IDecodedToken>jwt.verify(rf_token, `${token.refresh}`);
      if (!decoded.id)
        return reply.code(400).send({ message: "Please login now!" });

      const user = await prisma.user.findUnique({
        where: { userId: decoded.id },
      });

      if (!user)
        return reply
          .code(400)
          .send({ message: "This account does not exist!" });
      const access_token = generateToken.access({ id: user.userId });
      reply.code(200).send({ message: "Access token created", access_token });
    } catch (error: any) {
      reply.code(500).send({ message: error.message });
    }
  },
  logout: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      reply.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      return reply.code(200).send({ message: "Successfully logged out!" });
    } catch (error: any) {
      reply.code(500).send({ message: error.message });
    }
  },
};

const loginUser = async (
  user: IUser,
  password: string,
  reply: FastifyReply
) => {
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return reply.code(400).send({ message: "Password is incorrrect" });

  const access_token = generateToken.access({ id: user.userId });
  const refresh_token = generateToken.refresh({ id: user.userId });

  reply
    .cookie("refreshtoken", refresh_token, {
      path: "/api/refresh_token",
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 100, // 30 days
    })
    .code(200)
    .send({
      status: "success",
      message: "Login Successfully completed",
      access_token,
      user: { ...user, password: "" },
    });
};

export default authCtrl;
