//validator
import { validationResult, param } from "express-validator";

export const validator = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map((err) => ({
        campo: err.param,
        mensaje: err.msg,
      })),
    });
  }

  next();
};

export const mongoIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("You must enter an ID")
    .isMongoId()
    .withMessage("The ID is not valid"),
];
