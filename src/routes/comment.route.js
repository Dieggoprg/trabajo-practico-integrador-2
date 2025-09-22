//comment route
import { Router } from "express";
import { getAllComments, createComments, getByIdComment, updateComment, deleteComment } from "../controllers/comment.controller.js";

export const routeComment = Router();

routeComment.post("/comments", createComments)
routeComment.get("/comments", getAllComments)
routeComment.get("/comment/:id", getByIdComment)
routeComment.put("/comment/:id", updateComment)
routeComment.delete("/comment/:id", deleteComment)