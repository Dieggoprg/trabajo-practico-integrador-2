import { hashPassword } from "../../helpers/bcrypt.helper.js";
import { UserModel } from "../../models/user.model.js";
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
    .optional()
    .trim()
    .toLowerCase()
    .isLength({ min: 3, max: 50 })
    .withMessage("The first name must be between 3 and 50 characters long"),

  body("profile.lastName")
    .optional()
    .trim()
    .toLowerCase()
    .isLength({ min: 2, max: 50 })
    .withMessage("The last name must be between 3 and 50 characters long"),

  body("profile.biography")
    .optional()
    .isLength({ max: 500 })
    .withMessage("The biography cannot exceed 500 characters"),

  body("profile.avatarUrl")
    .optional()
    .isURL()
    .withMessage("Must be a valid URL")
    .matches(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/)
    .withMessage("El avatar debe ser una imagen válida (jpg, png, gif, webp)"),

  body("profile.birthDate")
    .optional()
    .isISO8601()
    .toDate()
    .trim()
    .withMessage("The date of birth must be in a valid format"),
];

export const loginValidation = [
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .custom(async (username) => {
      const user = await UserModel.findOne({ username });
      if (!username) {
        throw new Error("Invalid credentials");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("password is required")
    .custom(async (password) => {
      const hashed = await hashPassword(password);
      const passwordhash = await UserModel.findOne({ password: hashPassword });

      if (!passwordhash) {
        throw new Error("Invalid credentials");
      }
      return true;
    }),
];
