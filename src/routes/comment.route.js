//comment route
import { Router } from "express";
import { mongoIdValidator } from "../middlewares/validator.js";
import {
  getAllComments,
  createComments,
  getByIdComment,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import { ownerMiddleware, authorMiddleware } from "../middlewares/owner.js";
export const routeComment = Router();

routeComment.post("/comments", createComments);
routeComment.get("/comments", getAllComments);
routeComment.get("/comment/:id",mongoIdValidator, getByIdComment);
routeComment.put("/comment/:id",mongoIdValidator, updateComment);
routeComment.delete(
  "/comment/:id",
  ownerMiddleware,
  authorMiddleware,
  deleteComment
);
