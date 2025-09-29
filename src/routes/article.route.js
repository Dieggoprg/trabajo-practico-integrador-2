//article route
import { Router } from "express";

import {
  createArticle,
  getAllArticles,
  getByIdArticles,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controller.js";
import { ownerMiddleware, authorMiddleware } from "../middlewares/owner.js";
import { articleCreate } from "../middlewares/validations/article.validation.js";
import { validator } from "../middlewares/validator.js";
export const routeArticle = Router();

routeArticle.post("/articles",articleCreate, validator, createArticle);
routeArticle.get("/articles", getAllArticles);
routeArticle.get("/article/:id", getByIdArticles);
routeArticle.put("/article/:id", updateArticle);
routeArticle.delete(
  "/article/:id",
  ownerMiddleware,
  authorMiddleware,
  deleteArticle
);
