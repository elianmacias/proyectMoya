// invocamos al modulo de express para crear nuestro servidor
const express = require("express");

// declaramos la app para usar express
const app = express();

// seteamos urlencoded para capturar los datos del formulario
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// configuramos el directorio public
app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));

// declaramos el archivo de las rutas
app.use("/", require("./router"));

// middleware para rutas no configuradas

app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/public/404.html");
});

// declaramos el puerto de escucha del servidor
app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), (req, res) => {
  console.log("Servidor corriendo en puerto: " + app.get("port"));
});
