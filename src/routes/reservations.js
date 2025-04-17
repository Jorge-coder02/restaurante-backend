// Rutas relacionadas a reservas y disponibilidad
import { Router } from "express";
const router = Router();

import { Availability } from "../models/reservation.js"; // Importar el modelo de disponibilidad

// Ruta get
router.get("/create", async (req, res) => {
  try {
    return res.json({ msg: "Ruta de disponibilidad" });
  } catch (error) {
    return res.status(500).json({ err: "Error al obtener disponibilidad" });
  }
});

// 🟢 Obtener disponibilidad por fecha
router.get("/:date", async (req, res) => {
  const fecha = req.params.date;
  try {
    // Objeto
    const reservas = await Availability.find({
      date: new Date(fecha),
    });
    return res.json(reservas); // devuelvo las reservas completas, luego recojo las horas
  } catch (error) {
    return res.status(500).json({ err: "Error al recoger horas" });
  }
});

// 🔵 POST: Crear una nueva reserva
router.post("/create", async (req, res) => {
  const { fecha, hora } = req.body;
  if (fecha === "") {
    return res.status(400).json({ err: "Selecciona una fecha" });
  } else if (hora === "" || hora === "Selecciona una hora") {
    return res.status(400).json({ err: "Selecciona una hora" });
  }

  // Crear una date con sólo fecha
  const date = new Date(fecha);

  // Crear un id único a partir de fecha y hora
  const id = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${hora}`; // Formato YYYY-MM-DD-HH:MM

  // Crear un nuevo slot con la fecha y hora
  const slot = {
    time: hora,
    customerName: "Jorge",
  };

  // 📅 Verificar si la fecha ya existe en la base de datos
  const reserva = await Availability.findOne({ id }).catch((error) =>
    res.status(400).json({ err: "Error del servidor." || error.message })
  );

  // ❌ Ya existe
  if (reserva) {
    return res.status(400).json({ err: "La reserva ya existe en este tramo" });
  }

  // ✅ Crear nueva reserva
  try {
    const newReserva = new Availability({
      id: id,
      date: date,
      slots: slot,
    });
    await newReserva.save();
    return res.status(201).json({ message: "Reserva creada correctamente" });
  } catch (error) {
    return res.status(400).json({
      err: error.message || "Error del servidor. Inténtalo más tarde",
    });
  }
});

// 📝 Ruta Contacto (formulario)
router.get("/contact", async (req, res) => {
  try {
    return res.json({ msg: "Mensaje enviado correctamente" });
  } catch (error) {
    return res.status(500).json({ err: "Error al enviar el mensaje" });
  }
});

export default router;
