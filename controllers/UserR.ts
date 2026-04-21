import { Hono,} from "hono";
import type { Context } from "hono";
import prisma from "../repositories/Prisma";
import PrismaUserRepo from "../repositories/PrismaUserRepo";
import { number } from "zod";

const userRepo = new PrismaUserRepo(prisma);

export const getUsers = async (c: Context) => {
  const users = await userRepo.getUsers();
  return c.json(users);
};




export const updateUser = async (c: any) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  try {
    await userRepo.updateUser(id, body.name, body.email, body.password);
    return c.json({ message: "User updated" });
  } catch {
    return c.json({ error: "Update failed" }, 500);
  }
};

export const deleteUser = async (c: any) => {
  const id = c.req.param("id");

  try {
    await userRepo.deleteUser(id);
    return c.json({ message: "User deleted" });
  } catch {
    return c.json({ error: "Delete failed" }, 500);
  }
};