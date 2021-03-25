module.exports = function ownersH(owners) {
  return {
    GET: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (owners[data.indice]) {
          return callback(200, owners[data.indice]);
        }
        return callback(404, { menasaje: `owner con indice ${data.indice} no encontrada` });
      }
      callback(200, owners);
    },
    POST: (data, callback) => {
      owners.push(data.payload);
      callback(201, data.payload);
    },
    PUT: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (owners[data.indice]) {
          owners[data.indice] = data.payload;
          return callback(200, owners[data.indice]);
        }
        return callback(404, { menasaje: `owner con indice ${data.indice} no encontrada` });
      }
      callback(400, { mensaje: "indice no enviado" });
    },
    DELETE: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (owners[data.indice]) {
          owners = owners.filter((_owner, indice) => indice != data.indice);
          return callback(204, { mensaje: `elemento cn indice ${data.indice} eliminado` });
        }
        return callback(404, { menasaje: `owner con indice ${data.indice} no encontrada` });
      }
      callback(400, { mensaje: "indice no enviado" });
    },
    POST: (data, callback) => {
      owners.push(data.payload);
      callback(201, data.payload);
    }
  }
}