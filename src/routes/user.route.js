//user route
import { Router } from "express";
import {
  getAllUsers,
  getByIdUser,
  updateUsers,
  deleteUser,
} from "../controllers/user.controller.js";
import { mongoIdValidator, validator } from "../middlewares/validator.js";
import { userUpdateValidations } from "../middlewares/validations/user.validation.js";

export const routeUser = Router();

routeUser.get("/users", getAllUsers);
routeUser.get("/user/:id", mongoIdValidator, getByIdUser);
routeUser.put(
  "/users/:id",
  mongoIdValidator,
  userUpdateValidations,
  validator,
  updateUsers
);
routeUser.delete("/user/:id", mongoIdValidator, deleteUser);
