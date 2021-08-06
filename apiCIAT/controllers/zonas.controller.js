const Zonas = require("../models/Zonas");

exports.getAllZonesDangerous = async (req, res) => {
  try {
    const zones = await Zonas.find({});
    const onlyZones = [];
    if (!zones) {
      res.status(404).json({
        message: "No hay zonas en riesgo de deforestación registradas",
      });
    } else {
      zones.forEach((element) => {
        onlyZones.push(element.zones);
      });

      res.json(onlyZones);
    }
  } catch (error) {
    console.log(error);
  }
};
async function returnAllZonesDan() {
  try {
    const zones = await Zonas.find({});
    const onlyZones = [];
    if (zones) {
      zones.forEach((element) => {
        onlyZones.push(element.zones);
      });

      return onlyZones;
    }
  } catch (error) {}
}
exports.returnAllZonesDan = returnAllZonesDan;
