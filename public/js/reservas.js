window.addEventListener("load", () => {
  let htmlGenerado = "";
  htmlGenerado += `<div class="container">`;

  htmlGenerado += `<div class="row">`;

  htmlGenerado += `<div class="col-3">`;
  htmlGenerado += `<label class="form-label" for="txtCliente">Cliente:</label>`;
  htmlGenerado += `<input class="form-control" type="number" id="txtCliente"/>`;
  htmlGenerado += `</div>`;

  htmlGenerado += `<div class="col-3">`;
  htmlGenerado += `<label class="form-label" for="txtMesa">Mesa:</label>`;
  htmlGenerado += `<input class="form-control" type="number" id="txtMesa" />`;
  htmlGenerado += `</div>`;

  htmlGenerado += `<div class="col-3">`;
  htmlGenerado += `<label class="form-label" for="txtFecha">Fecha:</label>`;
  htmlGenerado += `<input class="form-control" type="date" id="txtFecha" />`;
  htmlGenerado += `</div>`;

  htmlGenerado += `<div class="col-3">`;
  htmlGenerado += `<label class="form-label" for="txtCosto">Costo:</label>`;
  htmlGenerado += `<input class="form-control" type="number" id="txtCosto" />`;
  htmlGenerado += `</div>`;

  htmlGenerado += `</div>`;

  htmlGenerado += `<div class="d-flex justify-content-center py-2">`;
  htmlGenerado += `<button class="m-2 btn btn-primary" id="btnNuevo">Nuevo</button>`;
  htmlGenerado += `<button class="m-2 btn btn-success" id="btnReservar">Reservar</button>`;
  htmlGenerado += `<button class="m-2 btn btn-info" id="btnConsultarClientes">Consultar Clientes</button>`;
  htmlGenerado += `<button class="m-2 btn btn-warning" id="btnConsultarMesas">Consultar Mesas</button>`;
  htmlGenerado += `<button class="m-2 btn btn-danger" id="btnConsultarReservas">Consultar Reservas</button>`;
  htmlGenerado += `<a  href="/" class="m-2 btn btn-dark" id="btnInicio">Inicio</a>`;
  htmlGenerado += `</div>`;

  htmlGenerado += `<div id="divContenido"></div>`;
  htmlGenerado += `</div>`;

  htmlCuerpo.innerHTML = htmlGenerado;

  btnNuevo.addEventListener("click", () => {
    txtCliente.value = "";
    txtMesa.value = "";
    txtFecha.value = "";
    txtCosto.value = "";
  });

  btnReservar.addEventListener("click", async () => {
    if (
      txtCliente.value === "" ||
      txtMesa.value === "" ||
      txtFecha.value === "" ||
      txtCosto.value === ""
    ) {
      alert("Debe llenar todos los campos del registro");
    } else {
      try {
        let url = `http://localhost:3000/reservar`;
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            idCliente: txtCliente.value,
            idMesa: txtMesa.value,
            fecha: txtFecha.value,
            costo: txtCosto.value,
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

  btnConsultarClientes.addEventListener("click", async () => {
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
            txtCliente.value = data[0].id_cliente;
          } catch (error) {
            console.log(error);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  });

  btnConsultarMesas.addEventListener("click", async () => {
    try {
      let url = `http://localhost:3000/mesa`;
      const res = await fetch(url);
      const data = await res.json();

      let tabla = `<table class="table table-bordered table-striped my-3 table-hover align-middle">`;

      tabla += `<thead class="table-dark">`;
      tabla += `<tr>`;
      tabla += `<th scope="col">ID</th>`;
      tabla += `<th scope="col">ID Rest</th>`;
      tabla += `<th scope="col">Número</th>`;
      tabla += `<th scope="col">Capacidad</th>`;
      tabla += `<th scope="col">Estado</th>`;
      tabla += `<th scope="col">Descripción</th>`;
      tabla += `</tr>`;
      tabla += `</thead>`;
      tabla += `<tbody>`;

      for (const item in data) {
        const actual = data[item];
        tabla += `<tr>`;
        tabla += `<td> <button class='btn btn-outline-info actualizar' value='${actual.id_mesa}'>${actual.id_mesa}</button>`;
        tabla += `<td>${actual.id_restaurante}`;
        tabla += `<td>${actual.num_mesa}`;
        tabla += `<td>${actual.capacidad_mesa}`;
        tabla += `<td>${actual.estado_mesa}`;
        tabla += `<td>${actual.descripcion_mesa}`;

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
            txtMesa.value = data[0].id_mesa;
          } catch (error) {
            console.log(error);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  });

  btnConsultarReservas.addEventListener("click", async () => {
    try {
      let url = `http://localhost:3000/reserva`;
      const res = await fetch(url);
      const data = await res.json();

      let tabla = `<table class="table table-bordered table-striped my-3 table-hover align-middle">`;

      tabla += `<thead class="table-dark">`;
      tabla += `<tr>`;
      tabla += `<th scope="col">ID</th>`;
      tabla += `<th scope="col">ID Cliente</th>`;
      tabla += `<th scope="col">ID Mesa</th>`;
      tabla += `<th scope="col">Estado</th>`;
      tabla += `<th scope="col">Fecha</th>`;
      tabla += `<th scope="col">Costo</th>`;
      tabla += `</tr>`;
      tabla += `</thead>`;
      tabla += `<tbody>`;

      for (const item in data) {
        const actual = data[item];
        tabla += `<tr>`;
        tabla += `<td> <button class='btn btn-outline-info'>${actual.id_reservacion}</button>`;
        tabla += `<td>${actual.id_cliente}`;
        tabla += `<td>${actual.id_mesa}`;
        tabla += `<td>${actual.estado_reservacion}`;
        tabla += `<td>${actual.fecha_reservacion}`;
        tabla += `<td>${actual.costo_reservacion}$`;

        tabla += `</tr>`;
      }
      tabla += `</tbody>`;
      tabla += "</table>";
      divContenido.innerHTML = tabla;
    } catch (error) {
      console.log(error);
    }
  });
});
