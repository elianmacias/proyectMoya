const { Client } = require("pg");
require("dotenv").config();

// declaramos el objeto de conexion con valores del .env
const connectionData = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PASSWORD,
  port: process.env.PORTDB,
};

// creamos la conexion con la base de datos
const conexion = new Client(connectionData);

// conectamos con la base de datos
conexion.connect((error) => {
  if (error) {
    console.log("El error de conexion es: " + error);
    return;
  } else {
    console.log("Conexion a la Base de Datos Exitosa");
  }
});

// exportamos nuestra conexion para poder ser usada en cualquier parte del proyecto
module.exports = conexion;
