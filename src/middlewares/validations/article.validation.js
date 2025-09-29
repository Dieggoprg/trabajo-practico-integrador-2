import { ArticlesModel } from "../../models/article.model.js";
import { UserModel } from "../../models/user.model.js";
import { body, param } from "express-validator";
import { TagsModel } from "../../models/tag.model.js";
import { Types } from "mongoose";

export const articleCreate = [
  body("title")
    .exists()
    .withMessage("The title field is required")
    .notEmpty()
    .withMessage("The title is required")
    .isString()
    .withMessage("The title can only contain letters")
    .isLength({ min: 3, max: 200 })
    .withMessage("The title must be between 3 and 200 characters long")
    .trim()
    .custom(async (t) => {
      const title = await ArticlesModel.findOne({ title: t });
      if (title) {
        throw new Error("The title is already in use");
      }
      return true;
    }),
  body("content")
    .exists()
    .withMessage("The content field is required")
    .notEmpty()
    .withMessage("The content is require")
    .isString()
    .withMessage("The content can only contain letters")
    .isLength({ min: 50 })
    .withMessage("The content must be between 50 characters long")
    .trim(),

  body("excerpt").notEmpty().withMessage("The excerpt ir required").trim(),

  body("status")
    .exists()
    .withMessage("The title field is required")
    .notEmpty()
    .withMessage("The status is required")
    .trim()
    .toLowerCase()
    .isIn(["published", "archived"])
    .withMessage("The status must be 'published' or 'archived'"),

  body("author")
    .exists()
    .withMessage("The author field ir required")
    .notEmpty()
    .withMessage("The author is required")
    .isMongoId()
    .withMessage("must be a valid Mongo ID")
    .custom(async (mongoId) => {
      const author = await UserModel.findById(mongoId);
      if (!author) {
        throw new Error("The reference with this ID was not found");
      }
      return true;
    }),

  body("tags")
    .isArray({ min: 1 })
    .withMessage("At least one tag is required")
    .custom(async (tags) => {
      tags.forEach(async (tagId) => {
        if (!Types.ObjectId.isValid(tagId)) {
          throw new Error(`Invalid tag ID: ${tagId}`);
        }
        const tag = await TagsModel.findById(tagId);
        if (!tag) {
          throw new Error(`Tag not found: ${tagId}`);
        }
      });
    }),
];
