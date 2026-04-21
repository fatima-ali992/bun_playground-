import type { Context } from "hono";
import prisma from "../repositories/Prisma";
import PrismaUserRepo from "../repositories/PrismaUserRepo";

const userRepo = new PrismaUserRepo(prisma);

export const createUser = async (c: Context) => {
  const body = await c.req.json();

  try {
    const user = await userRepo.createUser(body.name, body.email, body.password);

    return c.json(
      {
        message: "User created",
        user,
      },
      201
    );
  } catch (err) {
    return c.json({ error: "Create failed" }, 500);
  }
};