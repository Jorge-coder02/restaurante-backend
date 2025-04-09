import mongoose, { Schema } from "mongoose";
// En el shell de MongoDB:
// Esquema principal de disponibilidad
const availabilitySchema = new Schema(
  {
    id: { type: String, required: true }, // ID generado a partir de fecha y hora
    date: { type: Date, required: true }, // Fecha del turno
    slots: [
      {
        time: { type: String, required: true }, // Formato "HH:MM"
        customerName: { type: String, default: "Usuario" }, // Opcional: guardar nombre
      },
    ],
  },
  { timestamps: true }
);

export const Availability = mongoose.model("Availability", availabilitySchema);
