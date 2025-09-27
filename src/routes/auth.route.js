import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import { registerValidation } from "../middlewares/validations/auth.validation.js";
import { validator } from "../middlewares/validator.js";

export const authRoutes = Router();

authRoutes.post("/register", registerValidation, validator, register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
