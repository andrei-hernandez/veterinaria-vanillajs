module.exports = function consultasH({ consultas, veterinaries, mascotas }) {
  return {
    GET: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (consultas[data.indice]) {
          return callback(200, consultas[data.indice]);
        }
        return callback(404, { menasaje: `consulta con indice ${data.indice} no encontrada` });
      }
      const consultasConRelaciones = consultas.map((consulta) => (
        {
          ...consulta,
          mascota: { ...mascotas[consulta.mascota], id: consulta.mascota },
          veterinarie: { ...veterinaries[consulta.veterinarie], id: consulta.veterinarie },
        }
      ));
      callback(200, consultasConRelaciones);
    },
    POST: (data, callback) => {
      let newConsulta = data.payload;
      newConsulta.fechaCreacion = new Date();
      newConsulta.fechaEdicion = null;
      consultas = [...consultas, newConsulta];
      callback(201, newConsulta);
    },
    PUT: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (consultas[data.indice]) {
          const { fechaCreacion } = consultas[data.indice];
          consultas[data.indice] = { ...data.payload, fechaCreacion, fechaEdicion: new Date() };
          return callback(200, consultas[data.indice]);
        }
        return callback(404, { menasaje: `consulta con indice ${data.indice} no encontrada` });
      }
      callback(400, { mensaje: "indice no enviado" });
    },
    DELETE: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (consultas[data.indice]) {
          consultas = consultas.filter((_consulta, indice) => indice != data.indice);
          return callback(204, { mensaje: `elemento cn indice ${data.indice} eliminado` });
        }
        return callback(404, { menasaje: `consulta con indice ${data.indice} no encontrada` });
      }
      callback(400, { mensaje: "indice no enviado" });
    },
    POST: (data, callback) => {
      consultas.push(data.payload);
      callback(201, data.payload);
    }
  }
}