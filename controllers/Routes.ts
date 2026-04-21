import { Hono } from "hono";
import { createUser } from "./UserPost";
import { getUsers, updateUser, deleteUser } from "./UserR";

const userRoutes = new Hono();

// Debugging: here
userRoutes.get("/test", (c) => c.text("working"));

userRoutes.get("/", getUsers);
userRoutes.post("/", createUser);
userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);

export default userRoutes;