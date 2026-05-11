# 🚀 Guía Definitiva de Node.js y Desarrollo Backend

Esta es una guía completa y estructurada de Node.js, abarcando desde los fundamentos hasta arquitecturas avanzadas, despliegues y pruebas. Está diseñada para llevar proyectos desde su concepción hasta producción siguiendo las mejores prácticas de la industria.

---

## 📑 Índice
1. [Introducción a Node.js y Conceptos Básicos](#1-introducción-a-nodejs-y-conceptos-básicos)
2. [Configuración de TypeScript en Node.js](#2-configuración-de-typescript-en-nodejs)
3. [Fundamentos y Estructura de un Proyecto](#3-fundamentos-y-estructura-de-un-proyecto)
4. [Bases de Datos y ORMs](#4-bases-de-datos-y-orms)
5. [Creación de Servidores y APIs REST](#5-creación-de-servidores-y-apis-rest)
6. [Clean Architecture y Domain-Driven Design (DDD)](#6-clean-architecture-y-domain-driven-design-ddd)
7. [Monitoreo, Cron y Tareas de Background (NOC)](#7-monitoreo-cron-y-tareas-de-background-noc)
8. [Testing](#8-testing)
9. [Docker y Despliegue](#9-docker-y-despliegue)
10. [Paquetes de Terceros Útiles](#10-paquetes-de-terceros-útiles)

---

## 1. Introducción a Node.js y Conceptos Básicos

**Node.js** es un entorno de ejecución de JavaScript de código abierto y multiplataforma, diseñado para construir aplicaciones web y de red del lado del servidor (desligado del navegador web).

### Non-Blocking I/O
Casi ninguna función en Node bloquea la lectura, por lo que podemos manejar cientos de peticiones simultáneas sin bloquear el servidor gracias a una librería en C llamada **libuv**.

### Herramientas Core
* **NPM (Node Package Manager):** El gestor de paquetes por excelencia.
* **NVM (Node Version Manager):** ([NVM Windows](https://github.com/coreybutler/nvm-windows)) Sirve para gestionar múltiples versiones de Node.js en un mismo equipo.

> 💡 **Pro-Tip Profesional:** Siempre utiliza `nvm` en tus entornos de desarrollo. Nunca instales Node.js directamente desde el instalador web. Esto evitará conflictos de versiones entre proyectos antiguos y nuevos (ej: Node 14 vs Node 20). 

### JavaScript Moderno
* **Callbacks:** Funciones que se pasan como argumento a otras funciones para ser ejecutadas posteriormente. *(Hoy en día, se prefiere usar promesas para evitar el "Callback Hell").*
* **Promises & Fetch:** Manejo de asincronía moderno.
* **Async - Await:** Azúcar sintáctico sobre promesas. Son funciones que implícitamente regresan una promesa y permiten escribir código asíncrono de forma secuencial.

```javascript
const getPokemonById = async(id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const resp = await fetch(url);
    const pokemon = await resp.json();
    return pokemon.name
}

// Llamada:
getPokemonById(4)
    .then(console.log)
    .catch(err => console.log(`${err}, Por favor intente de nuevo`))
```

---

## 2. Configuración de TypeScript en Node.js

Node.js está adoptando TypeScript masivamente. Aquí se presentan diferentes estrategias de configuración dependiendo del caso de uso.

Más información - [Docs Oficiales](https://nodejs.org/en/learn/getting-started/nodejs-with-typescript)

### Opción A: TSX (Recomendado para ESM y Proyectos Modernos)

Esta es la forma más actual y recomendada, especialmente si usas módulos modernos (ESM) y ORMs como Prisma.

1. **Instalación:**
```bash
npm i -D typescript @types/node tsx rimraf
```

2. **Inicializar TypeScript:**
```bash
npx tsc --init --outDir dist/ --rootDir src --module ESNext --moduleResolution Bundler --target ES2023 
```

3. **Scripts (`package.json`):**
```json
"scripts": {
  "dev": "tsx watch src/app.ts",
  "build": "rimraf ./dist && tsc",
  "start": "node dist/app.js"
}
```

4. **Configuración robusta `tsconfig.json` (ESM y Prisma Support):**
```json
{
  "compilerOptions": {
    "target": "ES2023",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2023"],
    "types": ["node"],
    "rootDir": "src",
    "outDir": "dist",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "sourceMap": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.spec.ts"]
}
```

5. **Configuracion robusta `tsconfig.json` con prisma 2da opcion**


```json
{
  "compilerOptions": {
    /* --- Configuración del Entorno (Node.js 20/22+) --- */
    "target": "ES2023",                   // Genera JS moderno y eficiente
    "module": "NodeNext",                 // El estándar para ESM nativo en Node
    "moduleResolution": "NodeNext",       // Obligatorio para NodeNext
    "lib": ["ES2023"],                    // Diccionario de funciones de JS moderno
    "types": ["node"],                    // Tipos globales de Node (process, env, etc.)
    "rootDir": "src",
    "outDir": "dist",

    /* --- Compatibilidad con ORMs (Prisma/TypeORM) --- */
    "emitDecoratorMetadata": true,        // Requerido por TypeORM y decoradores
    "experimentalDecorators": true,       // Requerido por TypeORM
    "sourceMap": true,                    // Vital para debugging y rastreo de errores
    "esModuleInterop": true,              // Permite importar paquetes CommonJS sin problemas
    "resolveJsonModule": true,            // Permite importar archivos .json (común en configs)
    "skipLibCheck": true,                 // Ignora errores en tipos de librerías externas
    "forceConsistentCasingInFileNames": true,

    /* --- Ultra-Estrictez (Calidad de Producción) --- */
    "strict": true,                       // Activa el modo estricto completo
    "noUncheckedIndexedAccess": true,     // Seguridad total en arrays (ideal para DB)
    "exactOptionalPropertyTypes": true,   // Evita confusiones entre 'undefined' y 'ausente'
    "noFallthroughCasesInSwitch": true,   // Evita bugs en bloques switch
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.spec.ts"]
}
```

### Opción B: Nodemon + ts-node (Tradicional)

1. **Instalación:**
```bash
npm i -D typescript @types/node ts-node nodemon rimraf
```
2. **Configuración Nodemon (`nodemon.json`):**
```json
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "npx ts-node ./src/app.ts"
}
```

> 💡 **Pro-Tip Profesional:** Para proyectos nuevos usa `tsx`. Es dramáticamente más rápido que `ts-node` y tiene mejor soporte integrado para CommonJS y ESM. Asegúrate siempre de configurar tu `tsconfig.json` con `"strict": true` para maximizar la seguridad que TypeScript provee.

---

## 3. Fundamentos y Estructura de un Proyecto

### Inicio de Proyecto en Node
* **`npm init -y`**: Crea rápidamente el `package.json` con configuración por defecto.

### Scripts Útiles
Se recomienda automatizar el flujo de trabajo:
* `"dev"`: Para desarrollo continuo (usando `tsx` o `nodemon`).
* `"build"`: Para transpilar el código TypeScript a JavaScript (`tsc`).
* `"start"`: Para producción, ejecutando el código transpilado.

### Variables de Entorno (`process.env`)
Se accede a las variables a través de `process.env`. Es vital no quemar (hardcodear) credenciales en el código.
```javascript
const { SHELL, PORT } = process.env;
```

### Estructura Recomendada
* **`/src`**: Código fuente principal.
* **`/config` o `/plugins`**: Configuración de dependencias de terceros (Patrón Adaptador).
* **`/presentation`**: Rutas, Controladores, Servidor web.
* **`/domain`**: Reglas de negocio puras (Entidades, Casos de uso).
* **`/infrastructure` o `/data`**: Conexiones a bases de datos, APIs externas.

### Patrón Adaptador (¡Importante!)
Se utiliza como una capa de protección para crear un código propio que adapte las dependencias de terceros. De esta manera, tu lógica principal no depende directamente de una librería (ej: fetch, axios, o generadores de UUID).

```javascript
// En /plugins/http-client.plugin.js
const httpClientPlugin = {
    get: async(url) => {
        const resp = await fetch(url);
        return await resp.json();
    }
};
module.exports = { http: httpClientPlugin };

// Uso:
const { http } = require('../plugins');
const pokemon = await http.get(url);
```

> 💡 **Pro-Tip Profesional:** ¡Nunca uses `require` de un paquete de terceros directamente en tus casos de uso o controladores! Si mañana la librería `axios` se vuelve obsoleta o cambia su API, tendrías que cambiar 50 archivos. Si usas el patrón adaptador, solo cambias 1 archivo en la carpeta `/plugins`.

---

## 4. Bases de Datos y ORMs

### MongoDB (Mongoose)
Para iniciar MongoDB en Docker, revisa la sección de Docker. 

**Instalación:** `npm install mongoose`

Un Schema es la plantilla, y un Model es el "constructor" para manipular registros.
```typescript
import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
    message: { type: String, required: true },
    level: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], default: 'LOW' },
    createdAt: { type: Date, default: new Date() }
});

export const LogModel = mongoose.model('Log', logSchema);
```

### PostgreSQL + Prisma ORM
Prisma es el estándar de la industria actual para bases de datos relacionales en el ecosistema Node/TypeScript.

1. **Instalación:**
```bash
npm install prisma @types/node @types/pg --save-dev 
npm install @prisma/client @prisma/adapter-pg pg dotenv
```

2. **Inicializar:**
```bash
npx prisma init --db --output ../generated/prisma
```

3. **Esquema (`schema.prisma`):**
```prisma
generator client {
  provider = "prisma-client"
}

datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

4. **Migraciones y Cliente:**
```bash
npx prisma migrate dev --name init
npx prisma generate
```

5. **Uso (CRUD):**
```typescript
const newUser = await prisma.user.create({
    data: { email: 'test@test.com', name: 'Samuel' }
});

const users = await prisma.user.findMany({ where: { name: 'Samuel' } });
```

> 💡 **Pro-Tip Profesional:** Siempre usa migraciones (`prisma migrate dev`) y evita cambiar la base de datos a mano. Si tienes problemas de resolución de módulos con Prisma, borra el `output` del `generator` en tu schema y deja el valor por defecto. Recuerda que usar `tsx` facilita enormemente el uso de Prisma con ESM.

---

## 5. Creación de Servidores y APIs REST

### Express y Arquitectura Base
Todo lo referente al framework web debe residir en la capa de `Presentation`.

```typescript
import express from 'express';

const app = express();
app.use(express.json()); // Middleware para procesar JSON
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => console.log('Server running on port 3000'));
```

### DTOs (Data Transfer Objects)
Un DTO protege la aplicación validando cualquier información o carga útil (payload) que entre de manera limpia, evitando ensuciar los controladores.

```typescript
export class CreateTodoDto {
    private constructor(public readonly text: string) { }

    static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {
        const { text } = props;
        if (!text) return ['El texto es requerido'];
        return [undefined, new CreateTodoDto(text)];
    }
}
```

### Controladores y Rutas
Separa la definición de rutas de la lógica de procesamiento (controlador).

```typescript
// Controlador
export class TodosController {
    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ error });

        // Lógica de negocio / Base de datos aquí
        res.json({ msg: 'Creado con éxito', data: createTodoDto });
    }
}

// Rutas
const router = Router();
const todoController = new TodosController();
router.post('/', todoController.createTodo);
```

### Autenticación (Login / Register)
* **Bcrypt:** Nunca guardes contraseñas en texto plano. Usa `bcrypt` para "hashearlas" de manera unidireccional.
* **JWT (JSON Web Token):** Genera un token tras un login exitoso. Este token debe enviarse en cada petición futura (en los Headers `Authorization: Bearer <token>`) para identificar de forma segura al usuario.

> 💡 **Pro-Tip Profesional:** En tu Controlador, NUNCA expongas la contraseña de vuelta al cliente, incluso si está encriptada. Cuando devuelvas el objeto del usuario en una respuesta HTTP, limpia el campo `password`. Además, maneja los errores de forma centralizada.

---

## 6. Clean Architecture y Domain-Driven Design (DDD)

Para construir una API REST robusta e inmune a los cambios de librerías, se debe separar en capas estrictas:

1. **Capa de Dominio (`/domain`)**: El corazón de la aplicación. Contiene reglas de negocio puras (sin librerías).
   * **Entities**: La estructura real de los datos del sistema (`UserEntity`, `ProductEntity`).
   * **Use Cases**: La acción concreta que un usuario o sistema quiere realizar (ej. `RegisterUser`, `SendNotification`).
   * **Interfaces (Abstracts)**: Reglas sobre lo que debe hacer la capa exterior.
2. **Capa de Infraestructura (`/infrastructure`)**:
   * **DataSources**: Implementaciones concretas. Aquí usas Prisma, Mongoose, o fetch. Transforma los datos crudos a **Entities**.
   * **Repositories**: Intermediario entre los Use Cases y el DataSource.
3. **Capa de Presentación (`/presentation`)**:
   * **Controllers y Routes**: Reciben peticiones HTTP, ejecutan el Use Case enviando la inyección de dependencias y despachan respuestas HTTP. No saben nada de bases de datos.

> 💡 **Pro-Tip Profesional:** Las Entidades **no hablan** con los Casos de Uso, ni los Casos de Uso con los Controllers, ni los Controllers con interfaces externas. Las dependencias siempre fluyen **hacia adentro** (hacia el Dominio). Esto te permite cambiar de Express a Fastify, o de PostgreSQL a MySQL sin tocar ni una sola línea de lógica de negocio.

---

## 7. Monitoreo, Cron y Tareas de Background (NOC)

Un NOC (Network Operations Center) monitorea servicios y mantiene la red operativa. En Node, podemos ejecutar código en background sin intervención directa mediante peticiones HTTP.

### Tareas Programadas (Cron)
Usa librerías como `cron` para ejecutar procesos, envíos de emails o validaciones periódicas.
```typescript
import { CronJob } from 'cron';

const job = new CronJob('*/5 * * * * *', () => {
    console.log('Esto se ejecuta cada 5 segundos');
});
job.start();
```

### Inyección de Dependencias en Casos de Uso
En el caso de un monitor de red, puedes inyectar callbacks para definir qué hacer si el servicio responde o falla:

```typescript
class CheckService {
    constructor(
        private readonly successCallback: () => void,
        private readonly errorCallback: (error: string) => void
    ) {}

    async execute(url: string) {
        try {
            await fetch(url);
            this.successCallback();
        } catch (error) {
            this.errorCallback(`${error}`);
        }
    }
}
```

> 💡 **Pro-Tip Profesional:** Para el registro de logs corporativos, implementa múltiples datasources (ej: guardar logs `LOW` en FileSystem, y enviar logs `HIGH` a PostgreSQL y notificar por Email). Abstrae estas conexiones detrás de un `LogRepository` para que tu tarea Cron se mantenga limpia.

---

## 8. Testing

Las pruebas automatizadas garantizan la estabilidad de tu código y te evitan miedo al refactorizar.

### Terminología AAA
* **Arrange (Preparar):** Inicializar variables e importaciones del entorno inicial.
* **Act (Actuar):** Ejecutar la función o método a testear.
* **Assert (Afirmar):** Evaluar que el resultado obtenido es el esperado mediante `expect()`.

### Configuración con Jest
1. **Instalación:**
```bash
npm install -D jest @types/jest ts-jest supertest
```
2. **Inicializar:**
```bash
npx ts-jest config:init
```
3. **Scripts (`package.json`):**
```json
"test": "jest",
"test:watch": "jest --watch",
"test:coverage": "jest --coverage"
```

### Ejemplo de Prueba Unitaria
```typescript
import { describe, expect, test } from '@jest/globals';

describe('Calculadora', () => {
    test('debe sumar 10 y 20 y retornar 30', () => {
        // 1. Arrange
        const num1 = 10;
        const num2 = 20;
        // 2. Act
        const result = num1 + num2;
        // 3. Assert
        expect(result).toBe(30);
    });
});
```

### Uso de SpyOn y Mocks
`spyOn` se usa para rastrear llamadas a dependencias de terceros sin ejecutar su código original. Ideal para no bombardear APIs o DBs de producción.
```typescript
test('debe simular retorno del año', () => {
  const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(1995);
  const resultado = obtenerAnio();
  expect(resultado).toBe(1995); 
  expect(spy).toHaveBeenCalled();
});
```

> 💡 **Pro-Tip Profesional:** Evita hacer peticiones reales a bases de datos en tus tests unitarios. Utiliza Mocks o una base de datos de test en memoria (Docker o SQLite) para realizar pruebas de integración (como con `supertest`) puras, aisladas e idempotentes.

---

## 9. Docker y Despliegue

Docker empaqueta aplicaciones en contenedores estandarizados para que se ejecuten idénticamente en cualquier entorno (desarrollo, testing, producción).

### Levantando Bases de Datos con Docker Compose
Crea un `docker-compose.yml` en la raíz de tu proyecto para evitar instalar bases de datos nativamente en tu sistema operativo, manteniéndolo limpio.

```yml
version: '3.8'
services:
  postgres-db:
    image: postgres:latest
    restart: always # Se reiniciará siempre que inicie Docker
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - ./postgres:/var/lib/postgresql/data
    ports:
      - 5432:5432  
```

**Comandos vitales:**
* `docker compose up -d`: Levantar servicios en segundo plano.
* `docker compose down -v`: Detener contenedores y eliminar volúmenes.
* `docker ps -a`: Listar contenedores activos y detenidos.
* `docker exec -it <container_id> /bin/bash`: Entrar a la terminal interactiva del contenedor.

> 💡 **Pro-Tip Profesional:** ¡No subas la carpeta `/postgres` (volumen mapeado en tu PC local) a GitHub! Asegúrate de que los directorios mapeados en los volúmenes, así como el archivo `.env`, estén obligatoriamente en tu `.gitignore`.

---

## 10. Paquetes de Terceros Útiles

Una lista de las dependencias recurrentes más útiles e imprescindibles en el ecosistema actual de Node.js:

- **`uuid`:** Generador de IDs únicas y seguras universalmente.
- **`axios` / `node-fetch`:** Cliente HTTP versátil para consumir APIs externas.
- **`winston`:** Logger profesional (guarda logs en consola, archivos, o transportes en la nube).
- **`yargs`:** Procesamiento robusto de argumentos enviados a través de consola (`process.argv`).
- **`cron`:** Programador asíncrono de tareas en background.
- **`dotenv` / `env-var`:** Carga segura y validación estricta de variables de entorno `.env`.
- **`nodemailer`:** Estándar para configuración SMTP y envío de correos electrónicos.
- **`json-server`:** API REST mockeada instantánea (útil para prototipado rápido en equipos full-stack).
- **`supertest`:** Librería estándar de la industria para probar controladores y rutas de Express asertivamente junto con Jest.
- **`rimraf`:** Borrado de directorios (equivalente a `rm -rf`) que funciona igual de bien en Windows, Linux y Mac.

---
*Este proyecto y guía de referencia forman parte de una exhaustiva formación profesional en backend moderno. Desarrollado con ❤️ y mucho código.*
