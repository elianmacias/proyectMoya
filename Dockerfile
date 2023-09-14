# Usa la imagen oficial de PostgreSQL como imagen base
FROM postgres

# Variables de entorno para configurar la base de datos
ENV POSTGRES_USER admin
ENV POSTGRES_PASSWORD admin123
ENV POSTGRES_DB restaurant

# Copia scripts SQL para inicializar la base de datos (opcional)
# COPY init.sql /docker-entrypoint-initdb.d/

# Expone el puerto 5432 para que la aplicación Node.js pueda acceder a la base de datos
EXPOSE 5432

# Comando que se ejecutará al iniciar el contenedor
CMD ["postgres"]
