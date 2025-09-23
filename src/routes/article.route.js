//article route
import { Router } from "express";
import {  createArticle, getAllArticles, getByIdArticles, updateArticle, deleteArticle } from "../controllers/article.controller.js";

export const routeArticle = Router();

routeArticle.post("/articles", createArticle)
routeArticle.get("/articles", getAllArticles)
routeArticle.get("/article/:id", getByIdArticles)
routeArticle.put("/article/:id", updateArticle)
routeArticle.delete("/article/:id", deleteArticle)