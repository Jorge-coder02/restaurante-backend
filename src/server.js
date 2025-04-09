import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import reservationRoutes from "./routes/reservations.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/restaurante";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta básica para verificar que el backend está funcionando
app.get("/", async (req, res) => {
  try {
    res.send("¡Backend del restaurante funcionando! 🍽️");
  } catch (error) {
    res.status(500).json({ err: "error" });
  }
});

// Routes
app.use("/reservations", reservationRoutes);

// Conexión MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB");
  })
  .catch((e) => console.error("❌ Error al conectar a MongoDB:", e));

// Conexión servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor funcionando en puerto ${PORT}`);
});
