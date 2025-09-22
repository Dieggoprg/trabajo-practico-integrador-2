//archivo barril para las rutas
import { Router } from "express";
import { routeUser } from "./user.route.js";

export const routes = Router()

routes.use(routeUser)