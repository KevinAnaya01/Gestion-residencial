// app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // habilita CORS para todos los orígenes
app.use(express.json()); // para parsear JSON en el body

// Variables desde .env
const PORT = process.env.ENV_PORT || 3000;
const HOST = process.env.ENV_HOST || "localhost";

// Rutas de prueba
app.get("/", (req, res) => {
  res.json({
    message: "API funcionando 🚀",
    host: HOST,
    port: PORT,
    db: process.env.ENV_DB,
  });
});

// Iniciar servidor
app.listen(PORT, HOST, () => {
  console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});
