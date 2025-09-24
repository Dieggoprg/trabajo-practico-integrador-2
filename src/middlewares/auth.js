// import jwt from "jsonwebtoken"
import { verifyToken } from "../../helpers/jwt.helper.js";


export const authMiddleware = (req, res, next) => {
  try {
    // Obtener token de la cookie
    const token = req.cookies["token"];
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    // Verificar y decodificar token
    const decoded = verifyToken(token);

    // Almacenar datos del usuario
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};