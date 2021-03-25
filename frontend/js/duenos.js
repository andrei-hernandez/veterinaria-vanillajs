const nombre = document.getElementById('nombre');
const id = document.getElementById('id');
const apellido = document.getElementById('apellido');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');
const listaDuenos = document.getElementById('lista-duenos');
const url = 'https://veterinaria-vanillajs-backend.vercel.app//owners';

let duenos = [];

async function listarDuenos() {
  try {
    const res = await fetch(url);
    const ownersDelServer = await res.json();
    if (Array.isArray(ownersDelServer)) {
      duenos = ownersDelServer;
    }
    if (duenos.length > 0) {
      const htmlDuenos = duenos.map((dueno, index) => `<tr>
      <th scope="row">${index}</th>
      <td>${dueno.id}</td>
      <td>${dueno.nombre}</td>
      <td>${dueno.apellido}</td>
      <td>
          <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
              <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
          </div>
      </td>
    </tr>`).join("");
      listaDuenos.innerHTML = htmlDuenos;
      Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index) => botonEditar.onclick = editar(index));
      Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index) => botonEliminar.onclick = eliminar(index));
      return;
    }
    listaDuenos.innerHTML = `<tr>
      <td colspan="5" class="lista-vacia">No hay Dueñes</td>
      </tr>`;

  } catch (error) {
    $(".alert").show();
    throw error;
  }
}

async function enviarDatos(evento) {
  evento.preventDefault();
  try {
    const datos = {
      nombre: nombre.value,
      apellido: apellido.value,
      id: id.value
    };
    const accion = btnGuardar.innerHTML;
    let urlPOST = url;
    let method = 'POST';
    if (accion === 'Editar') {
      urlPOST += `/${[indice.value]}`;
      method = 'PUT';
    }
    const res = await fetch(urlPOST, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datos),
    });
    if (res.ok) {
      listarDuenos();
      resetModal();
    }
  } catch (error) {
    $(".alert").show();
    throw error;
  }
}

function editar(index) {
  return function cuandoCliqueo() {
    btnGuardar.innerHTML = 'Editar'
    $('#exampleModalCenter').modal('toggle');
    const dueno = duenos[index];
    indice.value = index;
    nombre.value = dueno.nombre;
    apellido.value = dueno.apellido;
    id.value = dueno.id;
  }
}

function resetModal() {
  indice.value = '';
  nombre.value = '';
  apellido.value = '';
  id.value = '';
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
        listarDuenos();
        resetModal();
      }
    } catch (error) {
      $(".alert").show();
      throw error;
    }
  }
}

listarDuenos();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;