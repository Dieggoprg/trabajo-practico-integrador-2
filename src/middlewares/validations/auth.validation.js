import { UserModel, ProfileModel } from "../../models/user.model.js";
import { body, param } from "express-validator";

export const registerValidation = [
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("The username must be between 3 and 20 characters long")
    .custom(async (username) => {
      const user = await UserModel.findOne({ username });
      if (!user) {
        throw new Error("The username is already in use");
      }
      return true;
    }),

  body("email")
    .notEmpty()
    .withMessage("email is required")
    .trim()
    .isEmail()
    .withMessage("It must be a valid email")
    .custom(async (email) => {
      const emailExist = await UserModel.findOne({ email });
      if (!user) {
        throw new Error("The Email is already in use");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .trim()
    .isLength({ min: 8 })
    .withMessage("The password must be at least 8 characters long.")
    .isAlphanumeric()
    .withMessage("the password cannot contain spaces in between")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .withMessage(
      "The password must contain at least one uppercase letter, one lowercase letter, and one number."
    ),

  body("role")
    .optional()
    .toLowerCase()
    .trim()
    .isIn(["user", "admin"])
    .withMessage("The role must be 'user' or 'admin'."),

  body("profile.firsName")
  .notEmpty()
  .withMessage("first name is required")
  .isLength({min: 3, max: 50})
  .withMessage("The username must be between 3 and 50 characters long")

  
];
