import { Hono } from "hono";
import { createUser } from "./UserPost";
import { getUsers, updateUser, deleteUser } from "./UserR";
import * as z from "zod";
import { sValidator } from '@hono/standard-validator'
import prisma from "../repositories/Prisma";
import PrismaUserRepo from "../repositories/PrismaUserRepo";


const userRoutes = new Hono();




// Debugging: here
userRoutes.get("/test", (c) => c.text("working"));

userRoutes.get("/", getUsers);

//zod schema for user validation

const createUser1 = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long").regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must contain both letters and numbers"),
  department: z.string().optional(),
  department2: z.string().optional(),
});


userRoutes.post("/", sValidator('json', createUser1), async (c) => {
  const data = c.req.valid('json'); 
  const userRepo = new PrismaUserRepo(prisma);
  const user = await userRepo.createUser(data.name, data.email, data.password);
  return c.json({ message: 'User added e  successfully!', user }, 202);
});   




userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);

export default userRoutes;