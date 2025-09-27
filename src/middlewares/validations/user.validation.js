//Validaciones con Express-Validator
import { UserModel } from "../../models/user.model.js";
import { param, body } from "express-validator";

//validation Update
export const userUpdateValidations = [
  body("username")
    .optional()
    .isLength({ min: 3, max: 20 })
    .withMessage("The username must be between 3 and 20 characters long")
    .isString()
    .withMessage("The username can only contain letters.")
    .custom(async (username, { req }) => {
      const user = await UserModel.findOne({
        username,
        _id: { $ne: req.params.id },
      });
      if (user) {
        throw new Error("The username is already in use");
      }
      return true;
    }),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const existEmail = await UserModel.findOne({ email });
      if (existEmail) {
        throw new Error("The entered email is already in use");
      }
      return true;
    }),
  body("password")
    .optional()
    .isAlphanumeric()
    .withMessage("The password can only contain letters and numbers."),

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
    .trim()
    .isDate()
    .withMessage("The date of birth must be in a valid format"),
];

//validation
