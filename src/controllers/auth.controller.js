//auth controller
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js"; // Importa comparePassword
import { generateToken } from "../helpers/jwt.helper.js"; // Importa generateToken
import { UserModel } from "../models/user.model.js";
import { body, matchedData } from "express-validator";

export const register = async (req, res) => {
  const { username, email, password, role, profile } = req.body;

  const hashed = await hashPassword(password);

  try {
    const user = await UserModel.create({
      username,
      email,
      password: hashed,
      role,
      profile,
    });

    return res.status(201).json({
      ok: true,
      msg: "User created",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({
      username: username, // Modifica la consulta para Mongoose
    });

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "invalid credentials",
      });
    }

    const validPassword = await comparePassword(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    } else {
      // Generar JWT
      const token = generateToken({
        id: user.id,
        name: user.username,
        role: user.role,
      });
      console.log(token);

      // Enviar token como cookie
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60, // 1 hora
      });

      return res.status(200).json({
        ok: true,
        msg: "succesfull login",
        data: {
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    }
  } catch (error) {
    console.error(error); // Loguea el error para debuggear
    return res.status(500).json({
      ok: false,
      msg: "Internal server error",
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  return res.json({ msg: "succesfull logout" });
};
