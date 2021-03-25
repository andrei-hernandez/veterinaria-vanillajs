module.exports = function veterinariesH(veterinaries) {
  return {
    GET: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (veterinaries[data.indice]) {
          return callback(200, veterinaries[data.indice]);
        }
        return callback(404, { menasaje: `veterinarie con indice ${data.indice} no encontrada` });
      }
      callback(200, veterinaries);
    },
    POST: (data, callback) => {
      veterinaries.push(data.payload);
      callback(201, data.payload);
    },
    PUT: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (veterinaries[data.indice]) {
          veterinaries[data.indice] = data.payload;
          return callback(200, veterinaries[data.indice]);
        }
        return callback(404, { menasaje: `veterinarie con indice ${data.indice} no encontrada` });
      }
      callback(400, { mensaje: "indice no enviado" });
    },
    DELETE: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (veterinaries[data.indice]) {
          veterinaries = veterinaries.filter((_veterinarie, indice) => indice != data.indice);
          return callback(204, { mensaje: `elemento cn indice ${data.indice} eliminado` });
        }
        return callback(404, { menasaje: `veterinarie con indice ${data.indice} no encontrada` });
      }
      callback(400, { mensaje: "indice no enviado" });
    },
    POST: (data, callback) => {
      veterinaries.push(data.payload);
      callback(201, data.payload);
    }
  }
}
