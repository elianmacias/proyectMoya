window.addEventListener('load', () => {
  let htmlGenerado = '';
  htmlGenerado += `<div class="container">`;

  htmlGenerado += `<div class="row">`;

  htmlGenerado += `<div class="col-2">`;
  htmlGenerado += `<label class="form-label" for="txtId">ID:</label>`;
  htmlGenerado += `<input class="form-control" type="number" id="txtId" readonly />`;
  htmlGenerado += `</div>`;

  htmlGenerado += `<div class="col-2">`;
  htmlGenerado += `<label class="form-label" for="txtRestauranteId">ID Restaurante:</label>`;
  htmlGenerado += `<input class="form-control" type="number" id="txtRestauranteId"/>`;
  htmlGenerado += `</div>`;

  htmlGenerado += `<div class="col-4">`;
  htmlGenerado += `<label class="form-label" for="txtNombre">Nombre:</label>`;
  htmlGenerado += `<input class="form-control" type="text" id="txtNombre" />`;
  htmlGenerado += `</div>`;

  htmlGenerado += `<div class="col-4">`;
  htmlGenerado += `<label class="form-label" for="txtApellido">Apellido:</label>`;
  htmlGenerado += `<input class="form-control" type="text" id="txtApellido" />`;
  htmlGenerado += `</div>`;

  htmlGenerado += `</div>`;

  htmlGenerado += `<div class="row">`;

  htmlGenerado += `<div class="col-4">`;
  htmlGenerado += `<label class="form-label" for="txtCedula">Cedula:</label>`;
  htmlGenerado += `<input class="form-control" type="text" id="txtCedula" />`;
  htmlGenerado += `</div>`;

  htmlGenerado += `<div class="col-4">`;
  htmlGenerado += `<label class="form-label" for="txtTelefono">Telefono:</label>`;
  htmlGenerado += `<input class="form-control" type="tel" id="txtTelefono" />`;
  htmlGenerado += `</div>`;

  htmlGenerado += `<div class="col-4">`;
  htmlGenerado += `<label class="form-label" for="txtDireccion">Dirección:</label>`;
  htmlGenerado += `<input class="form-control" type="text" id="txtDireccion" />`;
  htmlGenerado += `</div>`;

  htmlGenerado += `</div>`;

  htmlGenerado += `<div class="d-flex justify-content-center py-2">`;
  htmlGenerado += `<button class="m-2 btn btn-primary" id="btnNuevo">Nuevo</button>`;
  htmlGenerado += `<button class="m-2 btn btn-success" id="btnGrabar">Grabar</button>`;
  htmlGenerado += `<button class="m-2 btn btn-warning" id="btnModificar">Modificar</button>`;
  htmlGenerado += `<button class="m-2 btn btn-info" id="btnConsultar">Consultar</button>`;
  htmlGenerado += `<button class="m-2 btn btn-danger" id="btnEliminar">ELiminar</button>`;
  htmlGenerado += `<a  href="/" class="m-2 btn btn-dark" id="btnInicio">Inicio</a>`;
  htmlGenerado += `</div>`;

  htmlGenerado += `<div id="divContenido"></div>`;
  htmlGenerado += `</div>`;

  htmlCuerpo.innerHTML = htmlGenerado;

  btnNuevo.addEventListener('click', () => {
    txtRestauranteId.value = '';
    txtId.value = '';
    txtNombre.value = '';
    txtApellido.value = '';
    txtCedula.value = '';
    txtTelefono.value = '';
    txtDireccion.value = '';
  });

  btnGrabar.addEventListener('click', async () => {
    if (
      txtRestauranteId.value === '' ||
      txtNombre.value === '' ||
      txtApellido.value === '' ||
      txtCedula.value === '' ||
      txtTelefono.value === '' ||
      txtDireccion.value === ''
    ) {
      alert('Debe llenar todos los campos del registro');
    } else {
      try {
        let url = `http://localhost:3000/chef`;
        const res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            idRestaurante: txtRestauranteId.value,
            nombre: txtNombre.value,
            apellido: txtApellido.value,
            cedula: txtCedula.value,
            telefono: txtTelefono.value,
            direccion: txtDireccion.value,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();
        console.log('data', data);
        alert(data);
      } catch (error) {
        console.log(error);
      }
    }
  });

  btnModificar.addEventListener('click', async () => {
    if (txtId.value === '') {
      alert(
        'Para modificar un registro primero debe seleccionar un registro consultado'
      );
    } else {
      try {
        let url = `http://localhost:3000/chef/${txtId.value}`;

        const res = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify({
            idRestaurante: txtRestauranteId.value,
            nombre: txtNombre.value,
            apellido: txtApellido.value,
            cedula: txtCedula.value,
            telefono: txtTelefono.value,
            direccion: txtDireccion.value,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();

        alert(data);
      } catch (error) {
        console.log(error);
      }
    }
  });

  btnConsultar.addEventListener('click', async () => {
    try {
      let url = `http://localhost:3000/chef`;
      const res = await fetch(url);
      const data = await res.json();
      console.log('data', data);

      let tabla = `<table class="table table-bordered table-striped my-3 table-hover align-middle">`;

      tabla += `<thead class="table-dark">`;
      tabla += `<tr>`;
      tabla += `<th scope="col">ID</th>`;
      tabla += `<th scope="col">ID Rest</th>`;
      tabla += `<th scope="col">Nombre</th>`;
      tabla += `<th scope="col">Apellido</th>`;
      tabla += `<th scope="col">Cedula</th>`;
      tabla += `<th scope="col">Telefono</th>`;
      tabla += `<th scope="col">Dirección</th>`;
      tabla += `</tr>`;
      tabla += `</thead>`;
      tabla += `<tbody>`;

      for (const item in data) {
        const actual = data[item];
        tabla += `<tr>`;
        tabla += `<td> <button class='btn btn-outline-info actualizar' value='${actual.id_chef}'>${actual.id_chef}</button>`;
        tabla += `<td>${actual.id_restaurante}`;
        tabla += `<td>${actual.nombre_chef}`;
        tabla += `<td>${actual.apellido_chef}`;
        tabla += `<td>${actual.ci_chef}`;
        tabla += `<td>${actual.telf_chef}`;
        tabla += `<td>${actual.direccion_chef}`;

        tabla += `</tr>`;
      }
      tabla += `</tbody>`;
      tabla += '</table>';
      divContenido.innerHTML = tabla;

      document.querySelectorAll('.actualizar').forEach(e => {
        e.addEventListener('click', async () => {
          try {
            const res = await fetch(`${url}/${e.value}`);
            const data = await res.json();

            txtRestauranteId.value = data[0].id_restaurante;
            txtId.value = data[0].id_chef;
            txtNombre.value = data[0].nombre_chef;
            txtApellido.value = data[0].apellido_chef;
            txtCedula.value = data[0].ci_chef;
            txtTelefono.value = data[0].telf_chef;
            txtDireccion.value = data[0].direccion_chef;
          } catch (error) {
            console.log(error);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  });

  btnEliminar.addEventListener('click', async () => {
    if (txtId.value === '') {
      alert(
        'Para eliminar un registro primero debe seleccionar un registro consultado'
      );
    } else {
      try {
        let url = `http://localhost:3000/chef/${txtId.value}`;

        const res = await fetch(url, {
          method: 'DELETE',
        });

        const data = await res.json();
        alert(data);
      } catch (error) {
        console.log(error);
      }
    }
  });
});
