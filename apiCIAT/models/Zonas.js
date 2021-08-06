const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const zonasSchema = new Schema(
  {
    zones: [
        {
          lat: Number,
          lng: Number,
        },
    ]
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Zonas", zonasSchema, "zonas");
