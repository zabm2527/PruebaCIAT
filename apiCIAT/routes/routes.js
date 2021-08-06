const express = require("express");
const routes = express.Router();
const ganadoController = require("../controllers/ganado.controller");
const zonasController = require("../controllers/zonas.controller")

module.exports = function () {
  routes.get("/getAllCattles", ganadoController.getAllCattles);
  routes.get("/getAllZonesDangerous", zonasController.getAllZonesDangerous);

  return routes;
};
