//user route
import { Router } from "express";
import { getAllUsers, createUsers, getByIdUser, updateUsers, deleteUser } from "../controllers/user.controller.js";

export const routeUser = Router();

routeUser.post("/users", createUsers)
routeUser.get("/users", getAllUsers)
routeUser.get("/user/:id", getByIdUser)
routeUser.put("/users/:id", updateUsers)
routeUser.delete("/user/:id", deleteUser)
