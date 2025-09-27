//tag route
import { Router } from "express";
import {
  getAllTags,
  createTag,
  getByIdTag,
  updateTags,
  deleteTag,
} from "../controllers/tag.controller.js";
import { tagCreateValidation } from "../middlewares/validations/tag.validation.js";
import { mongoIdValidator, validator } from "../middlewares/validator.js";

export const routeTag = Router();

routeTag.post("/tags", tagCreateValidation, validator, createTag);
routeTag.get("/tags", getAllTags);
routeTag.get("/tag/:id",mongoIdValidator, getByIdTag);
routeTag.put("/tag/:id",mongoIdValidator,tagCreateValidation, validator, updateTags);
routeTag.delete("/tag/:id",mongoIdValidator, deleteTag);
