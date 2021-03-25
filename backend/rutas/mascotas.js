module.exports = function mascotasH(mascotas) {
  return {
    GET: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (mascotas[data.indice]) {
          return callback(200, mascotas[data.indice]);
        }
        return callback(404, { menasaje: `mascota con indice ${data.indice} no encontrada` });
      }
      callback(200, mascotas);
    },
    POST: (data, callback) => {
      mascotas.push(data.payload);
      callback(201, data.payload);
    },
    PUT: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (mascotas[data.indice]) {
          mascotas[data.indice] = data.payload;
          return callback(200, mascotas[data.indice]);
        }
        return callback(404, { menasaje: `mascota con indice ${data.indice} no encontrada` });
      }
      callback(400, { mensaje: "indice no enviado" });
    },
    DELETE: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (mascotas[data.indice]) {
          mascotas = mascotas.filter((_mascota, indice) => indice != data.indice);
          return callback(204, { mensaje: `elemento cn indice ${data.indice} eliminado` });
        }
        return callback(404, { menasaje: `mascota con indice ${data.indice} no encontrada` });
      }
      callback(400, { mensaje: "indice no enviado" });
    },
    POST: (data, callback) => {
      mascotas.push(data.payload);
      callback(201, data.payload);
    }
  }
}
