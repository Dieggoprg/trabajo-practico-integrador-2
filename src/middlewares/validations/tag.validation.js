import { TagsModel } from "../../models/tag.model.js";
import { body } from "express-validator";

//validation create
export const tagCreateValidation = [
  body("name")
    .exists()
    .withMessage("The name field is require")
    .notEmpty()
    .withMessage("The name is required")
    .isString()
    .withMessage("The name must only contain letters")
    .trim()
    .custom(async (n) => {
      const existName = await TagsModel.findOne({
        name: n,
      });
      if (existName) {
        throw new Error("A tag with the entered name already exists");
      }
      return true;
    }),
  body("description")
    .optional()
    .isLength({ max: 200 })
    .withMessage("The description must not exceed 200 characters"),
];

//validation update
export const tagUpdatedValidation = [
  body("name")
    .optional()
    .isString()
    .withMessage("The name must only contain letters")
    .trim()
    .custom(async (n) => {
      const existName = await TagsModel.findOne({
        name: n,
      });
      if (existName) {
        throw new Error("A tag with the entered name already exists");
      }
      return true;
    }),
  body("description")
    .optional()
    .isLength({ max: 200 })
    .withMessage("The description must not exceed 200 characters"),
];
