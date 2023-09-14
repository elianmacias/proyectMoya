const express = require("express");
const router = express.Router();
// llamamos a nuestra conexion de base de datos
const conexion = require("./database/db");

// CRUD para clientes
router.get("/cliente", async (req, res) => {
  try {
    const response = await conexion.query("SELECT * FROM cliente");
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
});

router.get("/cliente/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await conexion.query(
      `SELECT * FROM cliente where id_cliente = ${id}`
    );
    res.json(cliente.rows);
  } catch (error) {
    res.json(
      `${error.message} debe enviar como parametro un id numerico valido`
    );
  }
});

router.post("/cliente", async (req, res) => {
  const { nombre, apellido, cedula, telefono, correo } = req.body;

  try {
    const cliente = await conexion.query(
      `SELECT * FROM cliente where ci_cliente = '${cedula}'`
    );

    if (cliente.rows.length === 0) {
      try {
        const cliente = await conexion.query(
          `insert into cliente (NOMBRE_CLIENTE,APELLIDO_CLIENTE,CI_CLIENTE,TELF_CLIENTE,CORREO_CLIENTE) values ( '${nombre}','${apellido}','${cedula}','${telefono}','${correo}')`
        );
        res.json(
          `Se ha insertado exitosamente ${cliente.rowCount} registro en la base de datos`
        );
      } catch (error) {
        console.log(error);
        res.json(`${error.message}`);
      }
    } else {
      res.json(`El cliente con numero de cedula ${cedula} ya esta registrado`);
    }
  } catch (error) {
    res.json(`${error.message}, hubo un error al insertar`);
  }
});

router.put("/cliente/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, cedula, telefono, correo } = req.body;

  try {
    const cliente = await conexion.query(
      `SELECT * FROM cliente where id_cliente = ${id}`
    );

    if (cliente.rows.length === 0) {
      res.json(
        `No existe un registro para el id ${id}, intente ingresar otro id`
      );
    } else {
      try {
        const cliente = await conexion.query(
          `update cliente set NOMBRE_CLIENTE = '${nombre}' , APELLIDO_CLIENTE= '${apellido}' ,CI_CLIENTE='${cedula}',TELF_CLIENTE='${telefono}',CORREO_CLIENTE='${correo}' where id_cliente=${id}`
        );
        res.json(
          `Se ha actualizado exitosamente ${cliente.rowCount} registro en la base de datos`
        );
      } catch (error) {
        console.log(error);
        res.json(`${error.message}`);
      }
    }
  } catch (error) {
    res.json(`${error.message}, hubo un error al actualizar`);
  }
});

router.delete("/cliente/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await conexion.query(
      `SELECT * FROM cliente where id_cliente = ${id}`
    );

    if (cliente.rows.length === 0) {
      res.json(
        `No existe el registro con id ${id}, por ende no es posible eliminar`
      );
    } else {
      try {
        const cliente = await conexion.query(
          `delete from cliente where id_cliente=${id}`
        );
        res.json(
          `Se ha eliminado exitosamente ${cliente.rowCount} registro en la base de datos`
        );
      } catch (error) {
        console.log(error);
        res.json(`${error.message}`);
      }
    }
  } catch (error) {
    res.json(`${error.message}, hubo un error al eliminar`);
  }
});

// CRUD para chefs
router.get("/chef", async (req, res) => {
  try {
    const response = await conexion.query("SELECT * FROM chef");
    res.json(response.rows);
  } catch (error) {
    res.json(`Hubo un error al consultar la información: ${error.message}`);
  }
});

router.get("/chef/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const chef = await conexion.query(
      `SELECT * FROM chef where id_chef = ${id}`
    );
    res.json(chef.rows);
  } catch (error) {
    res.json(
      `${error.message} debe enviar como parametro un id numerico valido`
    );
  }
});

router.post("/chef", async (req, res) => {
  const { idRestaurante, nombre, apellido, cedula, telefono, direccion } =
    req.body;

  try {
    const chef = await conexion.query(
      `SELECT * FROM chef where ci_chef = '${cedula}'`
    );

    if (chef.rows.length === 0) {
      try {
        const chef = await conexion.query(
          `insert into chef (ID_RESTAURANTE, NOMBRE_CHEF,APELLIDO_CHEF,CI_CHEF,TELF_CHEF,DIRECCION_CHEF) values ( ${idRestaurante},'${nombre}','${apellido}','${cedula}','${telefono}','${direccion}')`
        );
        res.json(
          `Se ha insertado exitosamente ${chef.rowCount} registro en la base de datos`
        );
      } catch (error) {
        console.log(error);
        res.json(`${error.message} => ${error.detail}`);
      }
    } else {
      res.json(`El chef con numero de cedula ${cedula} ya esta registrado`);
    }
  } catch (error) {
    res.json(`${error.message}, hubo un error al insertar`);
  }
});

router.put("/chef/:id", async (req, res) => {
  const { id } = req.params;
  const { idRestaurante, nombre, apellido, cedula, telefono, direccion } =
    req.body;

  try {
    const chef = await conexion.query(
      `SELECT * FROM chef where id_chef = ${id}`
    );

    if (chef.rows.length === 0) {
      res.json(
        `No existe un registro para el id ${id}, intente ingresar otro id`
      );
    } else {
      try {
        const chef = await conexion.query(
          `update chef set ID_RESTAURANTE=${idRestaurante}, NOMBRE_CHEF = '${nombre}' , APELLIDO_CHEF= '${apellido}' ,CI_CHEF='${cedula}',TELF_CHEF='${telefono}',DIRECCION_CHEF='${direccion}' where id_CHEF=${id}`
        );
        res.json(
          `Se ha actualizado exitosamente ${chef.rowCount} registro en la base de datos`
        );
      } catch (error) {
        console.log(error);
        res.json(`${error.message} => ${error.detail}`);
      }
    }
  } catch (error) {
    res.json(`${error.message}, hubo un error al actualizar`);
  }
});

router.delete("/chef/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const chef = await conexion.query(
      `SELECT * FROM chef where id_chef = ${id}`
    );

    if (chef.rows.length === 0) {
      res.json(
        `No existe el registro con id ${id}, por ende no es posible eliminar`
      );
    } else {
      try {
        const chef = await conexion.query(
          `delete from chef where id_chef=${id}`
        );
        res.json(
          `Se ha eliminado exitosamente ${chef.rowCount} registro en la base de datos`
        );
      } catch (error) {
        console.log(error);
        res.json(`${error.message} => ${error.hint}`);
      }
    }
  } catch (error) {
    res.json(`${error.message}, hubo un error al eliminar`);
  }
});

// transacciones

router.post("/reservar", async (req, res) => {
  const { idCliente, idMesa, fecha, costo } = req.body;

  try {
    const response = await conexion.query(
      `call reservacion(${idCliente},${idMesa} ,'${fecha}',${costo})`
    );
    console.log(response);

    response.command === "CALL"
      ? res.json("Transacción Exitosa")
      : res.json("La Transacción no se efectuo");
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
});

router.post("/facturar", async (req, res) => {
  const { idFactura, idMenu, cantidad } = req.body;

  try {
    const response = await conexion.query(
      `call factura(${idFactura},${idMenu},${cantidad})`
    );
    console.log(response);

    response.command === "CALL"
      ? res.json("Transacción Exitosa")
      : res.json("La Transacción no se efectuo");
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
});

// Listar Mesas
router.get("/mesa", async (req, res) => {
  try {
    const response = await conexion.query("SELECT * FROM mesa");
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
});

router.get("/mesa/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const mesa = await conexion.query(
      `SELECT * FROM mesa where id_mesa = ${id}`
    );
    res.json(mesa.rows);
  } catch (error) {
    res.json(
      `${error.message} debe enviar como parametro un id numerico valido`
    );
  }
});

// Listar Reservas
router.get("/reserva", async (req, res) => {
  try {
    const response = await conexion.query("SELECT * FROM reservacion");
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
});

// CRUD para facturas
router.get("/factura", async (req, res) => {
  try {
    const response = await conexion.query("SELECT * FROM factura");
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
});

router.get("/factura/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const factura = await conexion.query(
      `SELECT * FROM factura where id_factura = ${id}`
    );
    res.json(factura.rows);
  } catch (error) {
    res.json(
      `${error.message} debe enviar como parametro un id numerico valido`
    );
  }
});

router.post("/factura", async (req, res) => {
  const { cliente, restaurante, codigo, fecha, subtotal, iva, total } =
    req.body;

  try {
    const factura = await conexion.query(
      `SELECT * FROM factura where cod_factura = '${codigo}'`
    );

    if (factura.rows.length === 0) {
      try {
        const factura = await conexion.query(
          `insert into factura (ID_CLIENTE,ID_RESTAURANTE,COD_FACTURA,FECHA_FACTURA,SUBTOTAL_FACTURA,IVA_FACTURA,TOTAL_FACTURA) values (${cliente}, ${restaurante}, '${codigo}','${fecha}',${subtotal},${iva},${total})`
        );
        res.json(
          `Se ha insertado exitosamente ${factura.rowCount} registro en la base de datos`
        );
      } catch (error) {
        console.log(error);
        res.json(`${error.message}`);
      }
    } else {
      res.json(`La factura con codigo ${codigo} ya esta registrada`);
    }
  } catch (error) {
    res.json(`${error.message}, hubo un error al insertar`);
  }
});

// CRUD para restaurantes
router.get("/restaurante", async (req, res) => {
  try {
    const response = await conexion.query("SELECT * FROM restaurante");
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
});

router.get("/restaurante/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const restaurante = await conexion.query(
      `SELECT * FROM restaurante where id_restaurante = ${id}`
    );
    res.json(restaurante.rows);
  } catch (error) {
    res.json(
      `${error.message} debe enviar como parametro un id numerico valido`
    );
  }
});

// CRUD para menus
router.get("/menu", async (req, res) => {
  try {
    const response = await conexion.query("SELECT * FROM menu");
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
});

router.get("/menu/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const menu = await conexion.query(
      `SELECT * FROM menu where id_menu = ${id}`
    );
    res.json(menu.rows);
  } catch (error) {
    res.json(
      `${error.message} debe enviar como parametro un id numerico valido`
    );
  }
});

// Listar Detalles de Factura
router.get("/detalle", async (req, res) => {
  try {
    const response = await conexion.query("SELECT * FROM detalle");
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
