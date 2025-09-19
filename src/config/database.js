//database
import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    // para borrar toda la base de datos
    await mongoose.connection.dropDatabase();
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log("No se pudo conectar a la base de datos", error);
  }
};