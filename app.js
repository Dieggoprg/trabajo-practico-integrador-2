//IMPORTACIONES
import "dotenv/config";
import express from "express";
import cors from "cors";
import { routes } from "./src/routes/indexRoutes.js";
import { connectDB } from "./src/config/database.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT;
const app = express();

//middlewares para la configuración del servidor
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:", PORT,
    credentials: true, // CRUCIAL: permitir cookies
  })
);
app.use(cookieParser()); // NECESARIO: para leer req.cookies

//middleware de rutas
app.use("/api", routes);

//test conection BD
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server listening on port", PORT);
    });
  })
  .catch((error) => {
    console.error("Error connecting to dataBase:", error);
  });
