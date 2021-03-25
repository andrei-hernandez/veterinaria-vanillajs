const recursos = require("./recursos");
const owners = require("./rutas/owners");
const mascotas = require("./rutas/mascotas");
const consultas = require("./rutas/consultas");
const veterinaries = require("./rutas/veterinaries");

module.exports = {
  route: (data, callback) => {
    callback(200, { mensaje: 'esto es route' });
  },

  mascotas: mascotas(recursos.mascotas),

  veterinaries: veterinaries(recursos.veterinaries),

  owners: owners(recursos.owners),

  consultas: consultas(recursos),

  notFound: (data, callback) => {
    callback(404, { mensaje: "not found" });
  }
};