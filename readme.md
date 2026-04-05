# Node Curso

## Que es Node
**Node.js** Es un entorno de ejecución de JavaScript de código abierto y multiplataforma, diseñado para construir aplicaciones web y de red del lado del servidor (desligado del navegador web).
### Non-Blocking I/O
Casi ninguna funcion en Node bloquea la lectura, por lo que podemos tener cientos de peticiones sin bloquear el servidor gracias a una libreria llamada **libuv**

### **NPM** Node Package Manager
Es el gestor de paquetes con mayor crecimiento y paquetes desplegados, la mayoría basados en **node**

### Node Version Manager - [NVM Windows](https://github.com/coreybutler/nvm-windows)
Sirve para gestionar multiples versiones de Node.js en un mismo equipo 
## Clean Architecture

![Clean Architecture](https://cdn-media-1.freecodecamp.org/images/YsN6twE3-4Q4OYpgxoModmx29I8zthQ3f0OR)

* Las entidades no hablan con los casos de usos, ni los casos de usos con los controllers, ni los controladores con external interfaces

### Clean Architecture para NOC - TASK
* LogEntity: nivel de severidad, mensaje del suceso, cuando paso
* Use Cases: Grabar Logs, Leer Logs, Enviar Email, etc
* Presenters: Aplicacion de Consola
* DataBase: FileSystem, MongoDB, etc

## Javascript
### String Methods

* **`String.split('')`:** Separa los strings en substring mediante el separador indicado (en este caso '')
* **`String.match('string')`:** Se usa para buscar coincidencias dentro de una cadena usando expresiones regulares
### Callbacks

Son funciones que tienen como argumento otras funciones 
```js
function getUserById( id, callback ) {
    const user = users.find( user => user.id === id)
    if( !user ) callback(`USUARIO ${id} NO EXISTE`)
    return callback(null, user)
}

getUserById(id, function(err, user){
    if(err) {
        throw new Error('User not found')
    }
    console.log(user)
})
```
Donde los argumentos de la funcion principal posee un **callback** que es se utiliza al momento en el que se ejecuta la funcion como argumento `function(err, user)`, donde el primer argumento es el error y el segundo es el respectivo que se esta buscando

### Promises

Promesa con peticion fetch

```js
const getPokemonById = ( id) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    return fetch(url)
            .then( (res ) => res.json())
            .then( (pokemon) => pokemon.name)
}
```
Resolucion de promesa
```js
getPokemonById(4)
    .then((pokemon) =>{
        console.log(pokemon)
})
```

### Async - Await

Son funciones que implicitamente regresan una promesa
```js
const getPokemonById = async( id) =>{

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    const resp = await fetch(url);
    const pokemon = await resp.json();

    return pokemon.name
}
```
> Al momento de llamar la promesa, se llama de igual manera

```js
getPokemonById(4)
    .then((pokemon) => console.log(pokemon))
    .catch( (err) => console.log(`${err}, Porfavor intente de nuevo`))
``` 

**`assync`:** Convierte la funcion en promesa
**`await`:** Es un codigo bloqueante que espera a que se resuelva la peticion

## Typescript

### Pasos para usar Node con TypeScript con Nodemon

Más información - [Docs Oficiales](https://nodejs.org/en/learn/getting-started/nodejs-with-typescript)

1. Instalar TypeScript y tipos de Node, como dependencia de desarrollo
```
npm i -D typescript @types/node
```
2. Inicializar el archivo de configuración de TypeScript ( Se puede configurar al gusto)
```
npx tsc --init --outDir dist/ --rootDir src
```

3. **Opcional** - Para traspilar el código, se puede usar este comando
```
npx tsc
npx tsc --watch
```

4. Configurar Nodemon y Node-TS
```
npm install -D ts-node nodemon
```
5. Crear archivo de configuración de Nodemon - **nodemon.json**
```
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "npx ts-node ./src/app.ts"
}
```
6. Crear script para correr en desarrollo en el **package.json**
```
  "dev": "nodemon"
  "dev": "npx nodemon" // En caso de no querer instalar nodemon
```

7. Instalar rimraf (Herramienta que funciona similar al rm -f) eliminar directorio
```
npm install -D rimraf
```

8. Crear scripts en el package.json para construir e iniciar en producción
```
   "build": "rimraf ./dist && tsc",
   "start": "npm run build && node dist/app.js"
```
## Bases de Node

### Inicio de Proyecto en Node
* **`npm init`** en la consola para iniciar un proyecto en node, nos creara el archivo `package.json` donde colocaremos el nombre, version, descripcion, entry point (index.js por defecto), test command, git repository. 
> Con `npm init -y` se crea todo el archivo por defecto sin necesidad de especificar los datos anteriormente mencionados

### Estructura de un Proyecto
* **Carpeta `src`:** Esta carpeta es donde se creara el codigo, el lugar donde la aplicacion va a vivir (Se crea en el mismo nivel que el `package.json`)
* **Carpeta `plugins`:** Esta carpeta
* **Carpeta `data`:**
* **Carpeta `presentation`:** Esta es la carpeta que va a estar de cara a cualquiera que este consumiendo nuestra aplicacion
* **Carpeta `data`:**
* **Carpeta `services`:**
    * **Patron adaptador:** Se utiliza como una capa o proteccion para crear un codigo propio que adapta las dependencias de tercero para que nuestro codigo no dependa de las mismas
    ```js

> Un caso de uso no es mas que una funcion que se encarga de resolver una tarea
    const getAgePlugin = require('get-age')

    const getAge = (birthdate) => {
        if (!birthdate) return new Error(`birthdate is required`)
        return getAgePlugin(birthdate)
    }

    module.exports = {
        getAge,
    }

    ```
* **Archivo de Barril `index`:** Sirve para cuando se tienen varias exportaciones, para importarlas todo desde un mismo archivo

### Patron Adaptador - FetchAPI

```js
const httpClientPlugin = {
    get: async(url) =>{
        const resp = await fetch(url);
        return await resp.json();
    },
    post: async(url, body) =>{},
    put: async(url, body) =>{},
    delete: async(url) =>{},
};
module.exports = {
    http: httpClientPlugin,
}
```
```js
const { http } = require('../plugins/index')

const getPokemonById = async( id) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const pokemon = await http.get(url)
    return pokemon.name
}
```


### Scripts en Node
Se pueden crear **scripts** en node de tal manera que nos puedan ayudar a hacer el trabajo mas facil
* **`"start": "node src/app.js"`**: Nos ayuda a ejecutar el archivo app.js con el comando `npm run start`

> Los scripts se encontraran en la seccion de `package.json`

### Importaciones y Exportaciones
* **`require('')`:** Nos ejecuta el archivo donde lo estamos importando
* **`module.exports = { Object }`:** Forma tradicional de exportar si queremos utilizar un objeto, funcion de otro archivo, al usar esto el `require()` nos retornara lo que estamos exportando

### Nodemon
Es una herramienta que nos permite que cada vez que se detecte un cambio se actualice la aplicacion
* Para instalarlo de manera global se usa el comando `npm install -g nodemon`
* `npm install --save-dev nodemon` para instalarlo como desarrollador o el shortcut `npm install -D nodemon`

Una manera de utilizarlo es crear un script de tal manera que `"dev": "nodemon src/app.js"` y poder utilizar el `npm run dev`

### Variables de Entorno


* ***`process`:** Son los procesos de node que esta corriendo
* **`process.env`:** Se muestran las variables de entorno que se ejecutan en node

```js 
const { SHELL, HOMEBREW_PREFIX } = process.env
```
> Utilizar la desestructuracion para conseguir las variables de entorno del `process`


### Hello World en Node

Al colocar en cualquier terminal `node` nos abre la terminal interactiva de node
```js
const message = 'Hola Mundo'
console.log(message)
// Hola Mundo
```
para correr un archivo en node nos ubicamos en la terminal y colocando `node "nombre del archivo"` ejecutara el archivo
```console
node app.js
Hola Mundo
``` 
### Leer archivos - **FileSystem**
```js
const fs = requires('fs')
const data = fs
```

* **`fs.readFileSync()`:** Sirve para leer el archivo
* **`fs.writeFileSync()`:** Sirve para crear un nuevo archivo con la informacion de la variable
* **`fs.mkdirSync(outputhPath, {recursive: true})`:** sirve para crear directorios, posee 2 argumentos, el primero es el directorio y el segundo son opciones para la creacion del directorio, recursivo, crea directorios intermedios si es true, modo, especifica permisos, `fs.mkdir()` es asincronico predeterminado, si deseas bloquear la ejecucion colocas el `sync`
```ts
fs.mkdir('./mi_proyecto/activos', { recursivo: verdadero, modo: 0o777 }, (err) => {
// … manejo de errores
});
```
* **`fs.existsSync()`:** Sirve para verificar si un archivo o carpeta existe en el sistema de archivos, devuelve un booleano
* **`fs.rmSync()`:** Elimina archivos o directorios, con `recursive: true` permite borrar carpetas con archivos adentro, y con `force: true` evita que lance error si la carpeta/archivo no existe 
* **`fs.appendFileSync`:** Agrega contenido al final del archivo 
* **`fs`:** 
* **`data.replace()`:** Sirve para reemplazar el las palabras del primer parametro por la del segundo parametro


```js
const fs = require('fs');
const data = fs.readFileSync('../readme.md', 'utf-8');
const newData = data.replace(/Node/ig, 'Pepe')
fs.writeFileSync('readme-pepe.md', newData)
```

### Factory Functions
Son funciones que crean y retornan objetos, sirve para buenas practicas de programación como el patron adaptador, lo que nos permite usar dependencias de terceros y modificarlas sin necesidad de tocar el codigo principal

```js 
const getAgePlugin = require('get-age')

const getAge = (birthdate) => {
    if (!birthdate) return new Error(`birthdate is required`)
    return getAgePlugin(birthdate)
}

module.exports = {
    getAge,
}
```
> `getAge` lo usaremos en el codigo principal, cuando se necesite cambiar de dependencia, simplemente nos vamos al plugin y lo cambiamos, no necesitamos recorrer todo el codigo

```js
const makeBuildPerson = ({getAge, getId}) =>{
    return ({name, birthdate}) =>{
        return {
            id: getId(),
            name: name,
            birthdate: birthdate,
            age: getAge(birthdate),
        }
}}
```
La factory function nos permite enviar como argumentos las dependencias 


### Argument Values - Argv

#### Yargs

```ts
export const yarg = yargs(hideBin(process.argv))
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'Multiplication table base'
    })
    .option('l', {
        alias: 'limit',
        type: 'number',
        default: 10,
        describe: 'Multiplication table limit'
    })
    .option('s', {
        alias: 'show',
        type: 'boolean',
        default: false,
        describe: 'Show multiplication table'
    })
    .check((argv, options) => {
        if (argv.b < 1) {
            throw 'Error: base must be a number'
        }
        return true;
    })
    .parseSync()
```
* **`.option()`:** permite establecer las opciones del argumento
* **`parseSync/Async()`:** determina si se ejecutara de manera sincrona o asincrona
* **`check(argv, options)`:** recibe 2 argumentos, el primero son los argv y el segundo son las opciones
* **``:**

#### Para enviar argumentos al process.argv
```ts
const runCommand = async (args: string[]) => {
    // permite enviar los argumentos para agregarlos al process.argv
    process.argv = [...process.argv, ...args]

    const { yarg } = await import('./args.plugin')

    return yarg
}
```

## Email

## Testing

### Pruebas Unitarias
Enfocadas en pequeñas funcionalidades
### Pruebas de Integracion
Enfocada en como reaccionan varias piezas en conjunto

> Una prueba unitaria puede ejemplarse con una llanta, una prueba de integracion podria verse como tener 4 llantas y verificar que todo funcione 

### Caracteristicas de las Pruebas
Tienen que ser: 
* Faciles de escribir
* Faciles de Leer
* Confiables
* Rapidas
* Principalmente Unitarias

### Terminlogia AAA, Arrange (arreglar), Act (Actuar), Assert (afirmar)

#### Arrange / Preparacion del Estado Inicial
* Inicializamos Variables
* Importaciones Necesarias
#### Act / Aplicamos acciones o estimulos
* Llamar Metodos
* Simular Clicks
* Realizar acciones sobre el paso anterior
#### Assert / Observar Comportamiento Resultante
* Resultados esperados ( que algo cambie, incremente o que no suceda nada)
* Se evalua el resultado del Act

### Tipos de testing

* **`expect(value).toBe(value2)`**
* **`expect(value).toEqual(value2)`** 
* **`expect(value).toBeGreaterThan(value2)`** 
* **`expect(value).toBeLessThan(value2)`** 
* **`expect(value).toBeGreaterThanOrEqual(value2)`** 
* **`expect(value).toBeLessThanOrEqual(value2)`** 
* **`expect(value).toBeCloseTo(value2)`** 
* **`expect(value).toBeDefined()`** 
* **`expect(value).toBeUndefined()`** 
* **`expect(value).toBeNull()`** 
* **`expect(value).toBeTruthy()`** 
* **`expect(value).toBeFalsy()`** 
* **`expect(value).toBeNaN()`** 
* **`expect(value).toBeInstanceOf(value2)`** 
* **`expect(value).toBeCloseTo(value2)`** 
* **`expect(value).toThrow(value2)`** 
* **`expect(value).toThrowError(value2)`** 
* **`expect(value).toStrictEqual(value2)`** 


```ts
// con JEST
import {describe, expect, test} from '@jest/globals';


describe('Test in the App File', () =>{

    test('should be 30', () =>{

        // 1. Arrange
        const num1 = 10;
        const num2 = 20;

        // 2. Act
        const result = num1 + num2;

        // 3. Assert
        expect(result).toBe(30);
    })
})
```

#### Metodo Done()
Se usa cuando tenemos codigo no bloqueante y necesitamos esperar a que se termine de ejecutar
```ts
    test('getUserById should return an error if user does not exist', (done)=>{
        const id = 10;

        getUserById(id, (err, user) =>{
            
            expect(err).toBe(`Usuario ${id} no existe`)
            expect(user).toBeUndefined()

            done();
        })
    })
```
### SpyOn
El spyOn en Jest es una función que te permite espiar (spy) métodos de objetos para rastrear cómo son llamados y, opcionalmente, modificar su comportamiento durante las pruebas.

* **¿Qué hace spyOn?**

    `spyOn` crea un "espía" en un método específico de un objeto, permitiéndote:

    * Rastrear llamadas: Verificar si el método fue llamado, cuántas veces, y con qué argumentos
    * Modificar comportamiento: Cambiar la implementación del método temporalmente
    * Mockear valores de retorno: Definir qué debe retornar el método sin ejecutar su código original

#### Metodos mas comunes
* `mockReturnValue(value)` - Define un valor de retorno
* `mockReturnValueOnce(value)` - Define un valor de retorno solo para la primera llamada
* `mockImplementation(fn)` - Reemplaza la implementación del método
* `mockResolvedValue(value)` - Para promesas que se resuelven
* `mockRejectedValue(error)` - Para promesas que se rechazan
* `mockRestore()` - Restaura la implementación original
* ` const createMock = jest.fn();` - Similar a los spy pero mas simple
**Trabajando con Jest.fn()**
```ts
        const logMock = jest.fn();
        const createMock = jest.fn() as ({ base, limit }: CreateTableOptions) => string;
        const saveFileMock = jest.fn() as ({ fileContent, destination, fileName }: SaveFileOptions) => boolean;

        global.console.log = logMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;
```
#### SpyOn - Metodo de Objetos (Verificar que fue llamado)

```ts
test('getAge should return 0 years', () =>{
        const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(1995);

        const birthdate = '1995-10-21';
        const age = getAge(birthdate);

        expect(age).toBe(0);
        expect(spy).toHaveBeenCalled();
    })
```
#### SpyOn - Mockear el valor de retorno
```ts
test('mockea el valor de retorno', () => {
  const spy = jest.spyOn(miObjeto, 'saludar')
    .mockReturnValue('Hola Mockeado');
    
  const resultado = miObjeto.saludar('Samuel');
  
  expect(resultado).toBe('Hola Mockeado'); // No ejecuta la función original
});
```

#### Spyon - winston 
```js
describe('plugins/logger.plugin.ts', () => {
    test('buildLogger sohuld return a function logger', () => {
        const logger = buildLogger('test')
        expect(typeof logger.log).toBe('function');
        expect(typeof logger.error).toBe('function');
    });

    test('logger.log shoud log a message', () => {

        const winstonLoggerMock = jest.spyOn(winstonLogger, 'log')

        const message = 'test message';
        const service = 'test service';

        const logger = buildLogger(service);
        logger.log(message);

        expect(winstonLoggerMock).toHaveBeenCalledWith(F
            'info',
            expect.objectContaining({
                 level: 'info',
                message,
                service,
            })
        );

```

## Bases de Datos

### MongoDB

Para iniciar mongo en docker se debe usar el comando `docker compose up -d` para mas informacion buscar la seccion de Inicializaciones

### Mongoose: Mongo y Node | OBJECT MODELING FOR NODE.JS

#### Inicializando

Instalacion `npm install mongoose`

> conectarse a mongodb con mongoose

```ts
    await mongoose.connect( URL, OPTIONS: {
        dbName: dbName,
    })
```

#### Schemas & Models 
 Un Schema es la plantilla, y un Model es el "constructor" que usa esa plantilla para crear y manipular registros en la DB, permitiendo operaciones como buscar, guardar, actualizar y borrar. 
```ts
const logSchema = new mongoose.Schema({

    message: {
        type: String,
        required: true,

    },
    origin: {
        type: String,
    },
    level: {
        type: String,
        required: true,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
})
export const logModel = mongoose.model('Log', logSchema);
```
> tratamos que el schema se asemeje a la entidad de regla de negocio 

#### Crear y Leer en Mongo

Para crear utilizamos el `model.create({options})` 
```ts
    const newLog = await logModel.create({
        message: 'Test message from mongo',
        origin: 'app.ts',
        level: "low",
    })
```
Y para guardar usamos el `.save()`
```ts
    await newLog.save()
```

con el `find()` nos devuelve el objeto de todo lo que hemos guardado en la base de datos
```ts
    const logs = await logModel.find()  
```

Si queremos regresar un dato, necesitamos utilizar el `?` ya que hay chance de que nos devuelva un undefined, con el `?` le decimos a ts que busque un dato y si no lo encuentra que devuelva undefined
```ts
    console.log(logs[7]?.message)
```

#### MongoLogDataSource 

Se crea la clase que implementa el LogDataSource
```ts
export class MongoLogDataSource implements LogDataSource {

}
```
el `saveLog()` funciona para guardar el log, solo recibiendo un LogEntity ya establecido en las reglas de negocio

```ts
export class MongoLogDataSource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await logModel.create(log)
        console.log('Mongo Log created:', newLog)
    }
}
```

en el `getLogs()` buscamos por el `severityLevel` y pasamos todo el arreglo de datos obtenido de mongo por un `.map()` con el metodo `.fromObject()` para filtrarlo y convertirlo en tipo `Promise<LogEntity[]>`
```ts
export class MongoLogDataSource implements LogDataSource {
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await logModel.find({
            level: severityLevel
        })

        return logs.map((log) => {
            return LogEntity.fromObject(log)
        })
    }
}
```

### PostgreSQL

### Prisma - ORM 


## Paquetes de Terceros utiles
> `npm i` para instalar las dependencias de tercero que falten (estan en el package.json)
* **uuid:** generador de id's unicas
* **axios:** facilita el uso de peticiones http y fetch
```js
async(url) =>{
    const {data} = await axios.get(url)
    return data
}
```
* **winston:** sirve para generar logs y guardarlos en un archivo 
```js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
//   defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
module.exports = function buildLogger(service) {
    return {
        log: (message) =>{
            logger.log('info', {message, service})
        }
    }
}
const logger = buildLogger('app.js');
logger.log('Hola Mundo')
```
* **yargs:** Sirve para procesar Arguments Values
```js
const argv = yargs.argv;
```
* **get-age:** Calcula la edad a partir de la fecha de nacimiento.
```js
const age = getAge('1990-01-01');
```
* **fs-extra:** Métodos de sistema de archivos extendidos con soporte para promesas.
```js
const fs = require('fs-extra');
```
* **cron:** Herramienta para programar tareas (Cron jobs).
```js
const cron = require('cron');
```
* **dotenv:** Carga variables de entorno desde un archivo .env.
```js
const dotenv = require('dotenv');
```
* **env-var:** Gestión y validación de variables de entorno.
```js
const envVar = require('env-var');
```
* **nodemailer:** Envío de correos electrónicos.
```js
const nodemailer = require('nodemailer');
```
* **json-server:** API REST falsa completa para prototipado rápido.
```js
const jsonServer = require('json-server');
```
* **:**
### Testing Libraries 
* **Jest:** Creado por Meta, diseñado para hacer que las pruebas de código sean sencillas, rápidas y fiables.
* **Mocha:** Creado por Douglas Crockford, es un framework de pruebas para JavaScript.
* **Jasmine:** creado por Google, es un framework de pruebas para JavaScript.

