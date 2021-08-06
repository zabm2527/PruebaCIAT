const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ganadoSchema = new Schema(
  {
    latGanado: Number,
    lngGanado: Number,
    owner: {
      firstname: String,
      lastname: String,
      id: Number,
      phonenumber: Number,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Ganado", ganadoSchema, "ganado");
