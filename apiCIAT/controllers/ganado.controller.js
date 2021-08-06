const Ganado = require("../models/Ganado");
const geolib = require("geolib");
const zonasControl = require("../controllers/zonas.controller");

exports.getAllCattles = async (req, res) => {
  try {
    let cattles = await Ganado.find({});
    let newcattles = [];
    if (cattles) {
      for (const element of cattles) {
        const validate = await validateIsInPolygon(element);
        if (validate) {
          newcattles.push({
            latGanado: element.latGanado,
            lngGanado: element.lngGanado,
            validate: validate,
            owner: {
              firstname: element.owner.firstname,
              lastname: element.owner.lastname,
              id: element.owner.id,
              phonenumber: element.owner.phonenumber,
            },
          });
        } else {
          newcattles.push({
            latGanado: element.latGanado,
            lngGanado: element.lngGanado,
            validate: false,
            owner: {
              firstname: element.owner.firstname,
              lastname: element.owner.lastname,
              id: element.owner.id,
              phonenumber: element.owner.phonenumber,
            },
          });
        }
      }

      res.json(newcattles);
    } else {
      res.status(404).json({
        message: "No hay ganado en zonas en riesgo de deforestación",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
async function validateIsInPolygon(dataCattles) {
  try {
    const allZones = await zonasControl.returnAllZonesDan();
    const cordinateSearch = {
      latitude: dataCattles.latGanado, //3.452415, //,
      longitude: dataCattles.lngGanado, //-76.56447, //,
    };
    let retbool = false;
    allZones.forEach((element) => {
      element = element.map((item) => {
        return {
          latitude: item.lat,
          longitude: item.lng,
        };
      });
      const valida = geolib.isPointInPolygon(cordinateSearch, element);
      if (valida) {
        retbool = valida;
        return;
      }
    });

    return retbool;
  } catch (error) {
    console.log(error);
  }
}
exports.validateIsInPolygon = validateIsInPolygon;
