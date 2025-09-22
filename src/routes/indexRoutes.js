//archivo barril para las rutas
import { Router } from "express";
import { routeUser } from "./user.route.js";
import { routeTag } from "./tag.route.js";
import { routeComment } from "./comment.route.js";

export const routes = Router()

routes.use(routeUser)
routes.use(routeTag)
routes.use(routeComment)