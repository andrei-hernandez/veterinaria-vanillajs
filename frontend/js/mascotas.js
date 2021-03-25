const tipo = document.getElementById('tipo');
const nombre = document.getElementById('nombre');
const owner = document.getElementById("dueno");
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');
const listaMascotas = document.getElementById('lista-mascotas');
const url = 'https://veterinaria-vanillajs-backend.vercel.app/mascotas';

let mascotas = [];

async function listarMascotas() {
  try {
    const res = await fetch(url);
    const mascotasDelServer = await res.json();
    if (Array.isArray(mascotasDelServer)) {
      mascotas = mascotasDelServer;
    }
    if (mascotas.length > 0) {
      const htmlMascotas = mascotas.map((mascota, index) => `<tr>
      <th scope="row">${index}</th>
      <td>${mascota.tipo}</td>
      <td>${mascota.nombre}</td>
      <td>${mascota.owner}</td>
      <td>
          <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
              <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
          </div>
      </td>
    </tr>`).join("");
      listaMascotas.innerHTML = htmlMascotas;
      Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index) => botonEditar.onclick = editar(index));
      Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index) => botonEliminar.onclick = eliminar(index));
      return;
    }
    listaMascotas.innerHTML = `<tr>
      <td colspan="5" class="lista-vacia">No hay Mascotas</td>
      </tr>`;

  } catch (error) {
    console.log({ error });
    $(".alert").show();
  }

}

async function enviarDatos(evento) {
  evento.preventDefault();
  try {
    const datos = {
      tipo: tipo.value,
      nombre: nombre.value,
      owner: owner.value
    };
    let method = 'POST';
    let urlPOST = url;
    const accion = btnGuardar.innerHTML;
    if (accion === 'Editar') {
      method = 'PUT';
      mascotas[indice.value] = datos;
      urlPOST = `${url}/${[indice.value]}`
    }
    const res = await fetch(urlPOST, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datos),
    });
    if (res.ok) {
      listarMascotas();
      resetModal();
    }
  } catch (error) {
    console.log({ error });
    $(".alert").show();
  }

}

function editar(index) {
  return function cuandoCliqueo() {
    btnGuardar.innerHTML = 'Editar'
    $('#exampleModalCenter').modal('toggle');
    const mascota = mascotas[index];
    nombre.value = mascota.nombre;
    owner.value = mascota.owner;
    tipo.value = mascota.tipo;
    indice.value = index;
  }
}

function resetModal() {
  nombre.value = '';
  owner.value = '';
  tipo.value = '';
  indice.value = '';
  btnGuardar.innerHTML = 'Crear'
}

function eliminar(index) {
  const urlPOST = `${url}/${index}`;
  return async function clickEnEliminar() {
    try {
      const res = await fetch(urlPOST, {
        method: 'DELETE',
      });
      if (res.ok) {
        listarMascotas();
        resetModal();
      }
    } catch (error) {
      console.log({ error });
      $(".alert").show();
    }
  }
}

listarMascotas();



form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;