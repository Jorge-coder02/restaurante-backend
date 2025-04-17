import mongoose, { Schema } from "mongoose";
// En el shell de MongoDB:
// Esquema principal de disponibilidad
const formularioContacto = new Schema(
  {
    id: { type: String, required: true }, // ID generado a partir de fecha y hora
    name: { type: String, required: true }, // Nombre del usuario
    email: { type: String, required: true }, // Nombre del usuario
    message: { type: String, required: true }, // Mensaje del usuario
  },
  { timestamps: true }
);

export const Contacto = mongoose.model("Contacto", formularioContacto);
