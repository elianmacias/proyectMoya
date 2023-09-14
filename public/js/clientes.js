window.addEventListener("load", () => {
  let htmlGenerado = "";
  htmlGenerado += `<div class="container">`;

  htmlGenerado += `<div class="row">`;

  htmlGenerado += `<div class="col-2">`;
  htmlGenerado += `<label class="form-label" for="txtId">ID:</label>`;
  htmlGenerado += `<input class="form-control" type="number" id="txtId" readonly />`;
  htmlGenerado += `</div>`;

  htmlGenerado += `<div class="col-5">`;
  htmlGenerado += `<label class="form-label" for="txtNombre">Nombre:</label>`;
  htmlGenerado += `<input class="form-control" type="text" id="txtNombre" />`;
  htmlGenerado += `</div>`;

  htmlGenerado += `<div class="col-5">`;
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
  htmlGenerado += `<label class="form-label" for="txtCorreo">Correo:</label>`;
  htmlGenerado += `<input class="form-control" type="email" id="txtCorreo" />`;
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

  btnNuevo.addEventListener("click", () => {
    txtId.value = "";
    txtNombre.value = "";
    txtApellido.value = "";
    txtCedula.value = "";
    txtTelefono.value = "";
    txtCorreo.value = "";
  });

  btnGrabar.addEventListener("click", async () => {
    if (
      txtNombre.value === "" ||
      txtApellido.value === "" ||
      txtCedula.value === "" ||
      txtTelefono.value === "" ||
      txtCorreo.value === ""
    ) {
      alert("Debe llenar todos los campos del registro");
    } else {
      try {
        let url = `http://localhost:3000/cliente`;
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            nombre: txtNombre.value,
            apellido: txtApellido.value,
            cedula: txtCedula.value,
            telefono: txtTelefono.value,
            correo: txtCorreo.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        alert(data);
      } catch (error) {
        console.log(error);
      }
    }
  });

  btnModificar.addEventListener("click", async () => {
    if (txtId.value === "") {
      alert(
        "Para modificar un registro primero debe seleccionar un registro consultado"
      );
    } else {
      try {
        let url = `http://localhost:3000/cliente/${txtId.value}`;

        const res = await fetch(url, {
          method: "PUT",
          body: JSON.stringify({
            nombre: txtNombre.value,
            apellido: txtApellido.value,
            cedula: txtCedula.value,
            telefono: txtTelefono.value,
            correo: txtCorreo.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        alert(data);
      } catch (error) {
        console.log(error);
      }
    }
  });

  btnConsultar.addEventListener("click", async () => {
    try {
      let url = `http://localhost:3000/cliente`;
      const res = await fetch(url);
      const data = await res.json();

      let tabla = `<table class="table table-bordered table-striped my-3 table-hover align-middle">`;

      tabla += `<thead class="table-dark">`;
      tabla += `<tr>`;
      tabla += `<th scope="col">ID</th>`;
      tabla += `<th scope="col">Nombre</th>`;
      tabla += `<th scope="col">Apellido</th>`;
      tabla += `<th scope="col">Cedula</th>`;
      tabla += `<th scope="col">Telefono</th>`;
      tabla += `<th scope="col">Email</th>`;
      tabla += `</tr>`;
      tabla += `</thead>`;
      tabla += `<tbody>`;

      for (const item in data) {
        const actual = data[item];
        tabla += `<tr>`;
        tabla += `<td> <button class='btn btn-outline-info actualizar' value='${actual.id_cliente}'>${actual.id_cliente}</button>`;
        tabla += `<td>${actual.nombre_cliente}`;
        tabla += `<td>${actual.apellido_cliente}`;
        tabla += `<td>${actual.ci_cliente}`;
        tabla += `<td>${actual.telf_cliente}`;
        tabla += `<td>${actual.correo_cliente}`;

        tabla += `</tr>`;
      }
      tabla += `</tbody>`;
      tabla += "</table>";
      divContenido.innerHTML = tabla;

      document.querySelectorAll(".actualizar").forEach((e) => {
        e.addEventListener("click", async () => {
          try {
            const res = await fetch(`${url}/${e.value}`);
            const data = await res.json();
            txtId.value = data[0].id_cliente;
            txtNombre.value = data[0].nombre_cliente;
            txtApellido.value = data[0].apellido_cliente;
            txtCedula.value = data[0].ci_cliente;
            txtTelefono.value = data[0].telf_cliente;
            txtCorreo.value = data[0].correo_cliente;
          } catch (error) {
            console.log(error);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  });

  btnEliminar.addEventListener("click", async () => {
    if (txtId.value === "") {
      alert(
        "Para eliminar un registro primero debe seleccionar un registro consultado"
      );
    } else {
      try {
        let url = `http://localhost:3000/cliente/${txtId.value}`;

        const res = await fetch(url, {
          method: "DELETE",
        });

        const data = await res.json();
        alert(data);
      } catch (error) {
        console.log(error);
      }
    }
  });
});
