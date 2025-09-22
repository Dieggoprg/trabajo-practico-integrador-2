//tag route
import { Router } from "express";
import { getAllTags, createTag, getByIdTag, updateTags, deleteTag } from "../controllers/tag.controller.js";

export const routeTag = Router();

routeTag.post("/tags", createTag)
routeTag.get("/tags", getAllTags)
routeTag.get("/tag/:id", getByIdTag)
routeTag.put("/tag/:id", updateTags)
routeTag.delete("/tag/:id", deleteTag)