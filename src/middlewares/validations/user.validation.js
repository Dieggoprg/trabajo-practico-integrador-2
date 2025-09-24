//Validaciones con Express-Validator
import { UserModel } from "../../models/user.model.js";
import { param, body } from "express-validator";

//validation Update
export const userUpdateValidations = [
  body("username")
    .optional()
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio")
    .isLength({ min: 3, max: 20 })
    .withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres")
    .isAlphanumeric()
    .withMessage("El nombre de usuario solo puede contener letras y números")
    .custom(async (username, { req }) => {
      const user = await UserModel.findOne({
        username,
        _id: { $ne: req.params._id },
      });
      if (user) {
        throw new Error("El nombre de usuario ya está en uso");
      }
      return true;
    }),
];
