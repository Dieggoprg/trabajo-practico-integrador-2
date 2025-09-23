//jwt helper
import jwt from "jsonwebtoken";

//Generar token
export const generateToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  } catch (error) {
    throw new Error("Error generating the token", error);
  }
};

//Verificar Token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Error verifying the Token");
  }
};
