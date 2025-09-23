//archivo barril para las rutas
import { Router } from "express";
import { routeUser } from "./user.route.js";
import { routeTag } from "./tag.route.js";
import { routeComment } from "./comment.route.js";
import { routeArticle } from "./article.route.js";
import { authRoutes } from "./auth.route.js";

export const routes = Router();

routes.use (authRoutes)
routes.use(routeUser)
routes.use(routeTag)
routes.use(routeComment)
routes.use(routeArticle)