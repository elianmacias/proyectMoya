window.addEventListener("load", () => {
  let htmlGenerado = "";
  htmlGenerado += `<div class="container">`;

  htmlGenerado += `<div class="row">`;

  htmlGenerado += `<div class="col-3">`;
  htmlGenerado += `<label class="form-label" for="txtCliente">Cliente:</label>`;
  htmlGenerado += `<input class="form-control" type="number" id="txtCliente"/>`;
  htmlGenerado += `</div>`;

  htmlGenerado += `<div class="col-3">`;
  htmlGenerado += `<label class="form-label" for="txtRestaurante">Restaurante:</label>`;
  htmlGenerado += `<input class="form-control" type="number" id="txtRestaurante" />`;
  htmlGenerado += `</div>`;

  htmlGenerado += `<div class="col-3">`;
  htmlGenerado += `<label class="form-label" for="txtCodigo">Codigo:</label>`;
  htmlGenerado += `<input class="form-control" type="text" id="txtCodigo" />`;
  htmlGenerado += `</div>`;

  htmlGenerado += `<div class="col-3">`;
  htmlGenerado += `<label class="form-label" for="txtFecha">Fecha:</label>`;
  htmlGenerado += `<input class="form-control" type="date" id="txtFecha" />`;
  htmlGenerado += `</div>`;

  htmlGenerado += `</div>`;

  htmlGenerado += `<div class="d-flex justify-content-center py-2">`;
  htmlGenerado += `<button class="m-2 btn btn-primary" id="btnNuevaFactura">Nueva Factura</button>`;
  htmlGenerado += `<button class="m-2 btn btn-success" id="btnCrearFactura">Crear Factura</button>`;
  htmlGenerado += `<button class="m-2 btn btn-info" id="btnConsultarClientes">Consultar Clientes</button>`;
  htmlGenerado += `<button class="m-2 btn btn-warning" id="btnConsultarRestaurantes">Consultar Restaurantes</button>`;
  htmlGenerado += `<a  href="/" class="m-2 btn btn-dark" id="btnInicio">Inicio</a>`;
  htmlGenerado += `</div>`;

  htmlGenerado += `<div class="row">`;

  htmlGenerado += `<div class="col-4">`;
  htmlGenerado += `<label class="form-label" for="txtFactura">Factura:</label>`;
  htmlGenerado += `<input class="form-control" type="number" id="txtFactura"/>`;
  htmlGenerado += `</div>`;

  htmlGenerado += `<div class="col-4">`;
  htmlGenerado += `<label class="form-label" for="txtMenu">Menu:</label>`;
  htmlGenerado += `<input class="form-control" type="number" id="txtMenu" />`;
  htmlGenerado += `</div>`;

  htmlGenerado += `<div class="col-4">`;
  htmlGenerado += `<label class="form-label" for="txtCantidad">Cantidad:</label>`;
  htmlGenerado += `<input class="form-control" type="number" id="txtCantidad" />`;
  htmlGenerado += `</div>`;

  htmlGenerado += `</div>`;

  htmlGenerado += `<div class="d-flex justify-content-center py-2">`;
  htmlGenerado += `<button class="m-2 btn btn-primary" id="btnNuevoDetalle">Nuevo</button>`;
  htmlGenerado += `<button class="m-2 btn btn-success" id="btnFacturar">Facturar</button>`;
  htmlGenerado += `<button class="m-2 btn btn-info" id="btnConsultarFacturas">Consultar Facturas</button>`;
  htmlGenerado += `<button class="m-2 btn btn-warning" id="btnConsultarMenus">Consultar Menus</button>`;
  htmlGenerado += `<button class="m-2 btn btn-danger" id="btnConsultarDetalles">Consultar Detalles</button>`;
  htmlGenerado += `<a  href="/" class="m-2 btn btn-dark" id="btnInicio">Inicio</a>`;
  htmlGenerado += `</div>`;

  htmlGenerado += `<div id="divContenido"></div>`;
  htmlGenerado += `</div>`;

  htmlCuerpo.innerHTML = htmlGenerado;

  //   seccion de factura
  btnNuevaFactura.addEventListener("click", () => {
    txtCliente.value = "";
    txtRestaurante.value = "";
    txtCodigo.value = "";
    txtFecha.value = "";
  });

  btnCrearFactura.addEventListener("click", async () => {
    if (
      txtCliente.value === "" ||
      txtRestaurante.value === "" ||
      txtCodigo.value === "" ||
      txtFecha.value === ""
    ) {
      alert("Debe llenar todos los campos del registro");
    } else {
      try {
        let url = `http://localhost:3000/factura`;
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            cliente: txtCliente.value,
            restaurante: txtRestaurante.value,
            codigo: txtCodigo.value,
            fecha: txtFecha.value,
            subtotal: 0,
            iva: 0,
            total: 0,
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

  btnConsultarRestaurantes.addEventListener("click", async () => {
    try {
      let url = `http://localhost:3000/restaurante`;
      const res = await fetch(url);
      const data = await res.json();

      let tabla = `<table class="table table-bordered table-striped my-3 table-hover align-middle">`;

      tabla += `<thead class="table-dark">`;
      tabla += `<tr>`;
      tabla += `<th scope="col">ID</th>`;
      tabla += `<th scope="col">Nombre</th>`;
      tabla += `<th scope="col">Ubicación</th>`;
      tabla += `<th scope="col">Gerente</th>`;
      tabla += `<th scope="col">Telefono</th>`;
      tabla += `</tr>`;
      tabla += `</thead>`;
      tabla += `<tbody>`;

      for (const item in data) {
        const actual = data[item];
        tabla += `<tr>`;
        tabla += `<td> <button class='btn btn-outline-info actualizar' value='${actual.id_restaurante}'>${actual.id_restaurante}</button>`;
        tabla += `<td>${actual.nombre_restaurante}`;
        tabla += `<td>${actual.ubi_restaurante}`;
        tabla += `<td>${actual.ger_restaurante}`;
        tabla += `<td>${actual.telf_restaurante}`;
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
            txtRestaurante.value = data[0].id_restaurante;
          } catch (error) {
            console.log(error);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  });

  //   seccion detalle de factura

  btnNuevoDetalle.addEventListener("click", () => {
    txtFactura.value = "";
    txtMenu.value = "";
    txtCantidad.value = "";
  });

  btnFacturar.addEventListener("click", async () => {
    if (
      txtFactura.value === "" ||
      txtMenu.value === "" ||
      txtCantidad.value === ""
    ) {
      alert("Debe llenar todos los campos del registro");
    } else {
      try {
        let url = `http://localhost:3000/facturar`;
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            idFactura: txtFactura.value,
            idMenu: txtMenu.value,
            cantidad: txtCantidad.value,
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

  btnConsultarFacturas.addEventListener("click", async () => {
    try {
      let url = `http://localhost:3000/factura`;
      const res = await fetch(url);
      const data = await res.json();

      let tabla = `<table class="table table-bordered table-striped my-3 table-hover align-middle">`;

      tabla += `<thead class="table-dark">`;
      tabla += `<tr>`;
      tabla += `<th scope="col">ID</th>`;
      tabla += `<th scope="col">ID Cliente</th>`;
      tabla += `<th scope="col">ID Rest</th>`;
      tabla += `<th scope="col">Codigo</th>`;
      tabla += `<th scope="col">Fecha</th>`;
      tabla += `<th scope="col">Subtotal</th>`;
      tabla += `<th scope="col">IVA</th>`;
      tabla += `<th scope="col">TOTAL</th>`;
      tabla += `</tr>`;
      tabla += `</thead>`;
      tabla += `<tbody>`;

      for (const item in data) {
        const actual = data[item];
        tabla += `<tr>`;
        tabla += `<td> <button class='btn btn-outline-info actualizar' value='${actual.id_factura}'>${actual.id_factura}</button>`;
        tabla += `<td>${actual.id_cliente}`;
        tabla += `<td>${actual.id_restaurante}`;
        tabla += `<td>${actual.cod_factura}`;
        tabla += `<td>${actual.fecha_factura}`;
        tabla += `<td>${actual.subtotal_factura}$`;
        tabla += `<td>${actual.iva_factura}$`;
        tabla += `<td>${actual.total_factura}$`;
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
            txtFactura.value = data[0].id_factura;
          } catch (error) {
            console.log(error);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  });

  btnConsultarMenus.addEventListener("click", async () => {
    try {
      let url = `http://localhost:3000/menu`;
      const res = await fetch(url);
      const data = await res.json();

      let tabla = `<table class="table table-bordered table-striped my-3 table-hover align-middle">`;

      tabla += `<thead class="table-dark">`;
      tabla += `<tr>`;
      tabla += `<th scope="col">ID</th>`;
      tabla += `<th scope="col">Nombre</th>`;
      tabla += `<th scope="col">Descripción</th>`;
      tabla += `<th scope="col">Precio de Venta</th>`;
      tabla += `<th scope="col">Costo de Hacer</th>`;
      tabla += `<th scope="col">Cantidad Vendida</th>`;
      tabla += `</tr>`;
      tabla += `</thead>`;
      tabla += `<tbody>`;

      for (const item in data) {
        const actual = data[item];
        tabla += `<tr>`;
        tabla += `<td> <button class='btn btn-outline-info actualizar' value='${actual.id_menu}'>${actual.id_menu}</button>`;
        tabla += `<td>${actual.nombre_menu}`;
        tabla += `<td>${actual.descripcion_menu}`;
        tabla += `<td>${actual.precio_venta_menu}$`;
        tabla += `<td>${actual.costo_menu}$`;
        tabla += `<td>${actual.cantidad_vendida_menu}`;
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
            txtMenu.value = data[0].id_menu;
          } catch (error) {
            console.log(error);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  });

  btnConsultarDetalles.addEventListener("click", async () => {
    try {
      let url = `http://localhost:3000/detalle`;
      const res = await fetch(url);
      const data = await res.json();

      let tabla = `<table class="table table-bordered table-striped my-3 table-hover align-middle">`;

      tabla += `<thead class="table-dark">`;
      tabla += `<tr>`;
      tabla += `<th scope="col">ID</th>`;
      tabla += `<th scope="col">ID FACT</th>`;
      tabla += `<th scope="col">ID Menu</th>`;
      tabla += `<th scope="col">Cantidad</th>`;
      tabla += `<th scope="col">Valor Unitario</th>`;
      tabla += `<th scope="col">Valor Total</th>`;
      tabla += `</tr>`;
      tabla += `</thead>`;
      tabla += `<tbody>`;

      for (const item in data) {
        const actual = data[item];
        tabla += `<tr>`;
        tabla += `<td> <button class='btn btn-outline-info'>${actual.id_detalle}</button>`;
        tabla += `<td>${actual.id_factura}`;
        tabla += `<td>${actual.id_menu}`;
        tabla += `<td>${actual.cantidad_detalle}`;
        tabla += `<td>${actual.valor_unitario_detalle}$`;
        tabla += `<td>${actual.valor_total_detalle}$`;
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
