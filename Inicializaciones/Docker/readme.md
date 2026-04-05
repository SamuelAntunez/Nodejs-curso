# Docker
Docker sirve para empaquetar aplicaciones y sus dependencias en unidades estandarizadas llamadas contenedores, permitiendo que se ejecuten de manera consistente y predecible en cualquier entorno

## Levantar Base de datos y colocarla en el contenedor

Se crea un archivo llamado docker-compose.yml 

```yml
version: // version de docker-composek
services:
  mongo-db:
    image: mongo // version de mongo, asi es la ultima version disponible
    restart: always // permite que el docker desktop se inicialice cada vez que se vuelva a abrir
    environment: // variables de entorno
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_USER}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASS}
    volumes:
      - ./mongo:/data/db  // para que la informacion se guarde en nuestro disco
    ports:
      - 27017:27017  // puerto por defecto
  postgres-db:
    image: postgres
    restart: always
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - ./postgres:/var/lib/postgresql
    ports:
      - 5432:5432  
```


```env
MONGO_URL = mongodb://samuel:123456@localhost:27017/NOC  // link directo a la base de datos
MONGO_DB_NAME = NOC
MONGO_USER = samuel 
MONGO_PASS = 123456
```

Para iniciar docker y crear la imagen se usa el comando `docker compose up` si quieres que se inicie en segundo plano se usa `docker compose up -d`

Run `docker compose down -v` to remove the containers and the named volume.
Run `docker compose up -d` to start fresh with mongo:latest.

## Comandos Útiles de Docker

### Imágenes
- `docker images`: Listar imágenes descargadas.
- `docker pull <image>`: Descargar una imagen.
- `docker rmi <image_id>`: Eliminar una imagen.
- `docker build -t <name> .`: Construir una imagen desde un Dockerfile.

### Contenedores
- `docker ps`: Listar contenedores en ejecución.
- `docker ps -a`: Listar todos los contenedores (incluidos los detenidos).
- `docker run -d -p <host_port>:<container_port> --name <name> <image>`: Correr un contenedor.
- `docker stop <container_id>`: Detener un contenedor.
- `docker start <container_id>`: Iniciar un contenedor detenido.
- `docker rm <container_id>`: Eliminar un contenedor.
- `docker logs -f <container_id>`: Ver logs en tiempo real.
- `docker exec -it <container_id> /bin/bash`: Entrar a la terminal del contenedor (o `sh` si bash no existe).

### Volúmenes
- `docker volume ls`: Listar volúmenes.
- `docker volume create <name>`: Crear un volumen.
- `docker volume rm <name>`: Eliminar un volumen.
- `docker volume inspect <name>`: Ver detalles del volumen.

### Redes
- `docker network ls`: Listar redes.
- `docker network create <name>`: Crear una red.
- `docker network inspect <name>`: Ver detalles de la red.

### Limpieza
- `docker system prune`: Eliminar contenedores detenidos, redes no usadas e imágenes "dangling".

### Docker Compose
- `docker-compose up -d`: Levantar servicios en segundo plano.
- `docker-compose down`: Detener y eliminar contenedores y redes.
- `docker-compose down -v`: Igual que down, pero también borra volúmenes.
- `docker-compose logs -f`: Ver logs de todos los servicios.
- `docker-compose config`: Validar y ver la configuración final.
