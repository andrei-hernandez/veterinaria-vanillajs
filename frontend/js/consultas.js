const listaConsultas = document.getElementById('lista-consultas');
const formulario = document.getElementById('formulario');
const mascota = document.getElementById('mascota');
const veterinarie = document.getElementById('veterinarie');
const historia = document.getElementById('historia');
const diagnostico = document.getElementById('diagnostico');
const btnGuardar = document.getElementById('btn-guardar');
const indice = document.getElementById('indice');
const url = 'https://veterinaria-vanillajs-backend.vercel.app';

let consultas = [];
let mascotas = [];
let veterinaries = [];

async function listarConsultas() {
  const entity = 'consultas'
  try {
    const res = await fetch(`${url}/${entity}`);
    const consultasDelServer = await res.json();
    if (Array.isArray(consultasDelServer)) {
      consultas = consultasDelServer;
    }
    if (res.ok) {
      const htmlConsultas = consultas
        .map(
          (consulta, indice) =>
            `<tr>
        <th scope="row">${indice}</th>
        <td>${consulta.mascota.nombre}</td>
        <td>${consulta.veterinarie.nombre} ${consulta.veterinarie.apellido}</td>
        <td>${consulta.diagnostico}</td>
        <td>${consulta.fechaCreacion}</td>
        <td>${consulta.fechaEdicion}</td>
        
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
            </div>
        </td>
      </tr>`
        )
        .join("");
      listaConsultas.innerHTML = htmlConsultas;
      Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index) => botonEditar.onclick = editar(index));
    }
  } catch (error) {
    $(".alert-danger").show();
    throw error;
  }
}

listarConsultas();

async function listarMascotas() {
  const entity = 'mascotas'
  try {
    const res = await fetch(`${url}/${entity}`);
    const MascotasDelServer = await res.json();
    if (Array.isArray(MascotasDelServer)) {
      mascotas = MascotasDelServer;
    }
    if (res.ok) {
      const htmlMascotas = mascotas
        .map(
          (mascota, indice) =>
            `<option value="${indice}">${mascota.nombre}</option>`
        )
        .join("");
      mascota.innerHTML += htmlMascotas;
    }
  } catch (error) {
    $(".alert-danger").show();
    throw error;
  }
}

listarMascotas();

async function listarVeterinaries() {
  const entity = 'veterinaries'
  try {
    const res = await fetch(`${url}/${entity}`);
    const veterinariesDelServer = await res.json();
    if (Array.isArray(veterinariesDelServer)) {
      veterinaries = veterinariesDelServer;
    }
    if (res.ok) {
      const htmlVeterinaries = veterinaries
        .map(
          (veterinarie, indice) =>
            `<option value="${indice}">${veterinarie.nombre} ${veterinarie.apellido}</option>`
        )
        .join("");
      veterinarie.innerHTML += htmlVeterinaries;
    }
  } catch (error) {
    $(".alert-danger").show();
    throw error;
  }
}

listarVeterinaries();

function editar(index) {
  return function cuandoCliqueo() {
    btnGuardar.innerHTML = 'Editar'
    $('#exampleModalCenter').modal('toggle');
    const consulta = consultas[index];
    mascota.value = consulta.mascota.id;
    veterinarie.value = consulta.veterinarie.id;
    historia.value = consulta.historia;
    diagnostico.value = consulta.diagnostico;
    indice.value = index;
  }
}

function resetModal() {
  btnGuardar.innerHTML = "Crear";
  [indice, mascota, veterinarie, historia, diagnostico].forEach(
    (inputActual) => {
      inputActual.value = "";
      inputActual.classList.remove("is-invalid");
      inputActual.classList.remove("is-valid");
    }
  );
  $(".alert-warning").hide();
  $("#exampleModalCenter").modal("toggle");
}

async function enviarDatos(evento) {
  const entity = "consultas";
  evento.preventDefault();
  try {
    const datos = {
      mascota: mascota.value,
      veterinarie: veterinarie.value,
      historia: historia.value,
      diagnostico: diagnostico.value
    };
    if (validar(datos) === true) {
      let method = 'POST';
      let urlPOST = `${url}/${entity}`;
      const accion = btnGuardar.innerHTML;
      if (accion === 'Editar') {
        method = 'PUT';
        mascotas[indice.value] = datos;
        urlPOST += `/${[indice.value]}`
      }
      const res = await fetch(urlPOST, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datos),
      });
      if (res.ok) {
        listarConsultas();
        resetModal();
      }
      return;
    }
    $(".alert-warning").show();
  } catch (error) {
    $(".alert-danger").show();
    throw error;
  }
}

function validar(datos) {
  let response = true;
  if (typeof datos !== 'object') return false; {
    for (let key in datos) {
      if (datos[key].length === 0) {
        document.getElementById(key).classList.add('is-invalid');
        response = false;
      } else {
        document.getElementById(key).classList.remove('is-invalid');
        document.getElementById(key).classList.add('is-valid');
      }
    }
    return response;
  }
}
btnGuardar.onclick = enviarDatos;