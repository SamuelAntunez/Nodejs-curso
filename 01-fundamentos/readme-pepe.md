# Pepe Curso

## Que es Pepe
**Pepe.js** Es un entorno de ejecución de JavaScript de código abierto y multiplataforma, diseñado para construir aplicaciones web y de red del lado del servidor (desligado del navegador web).
### Non-Blocking I/O
Casi ninguna funcion en Pepe bloquea la lectura, por lo que podemos tener cientos de peticiones sin bloquear el servidor gracias a una libreria llamada **libuv**

### **NPM** Pepe Package Manager
Es el gestor de paquetes con mayor crecimiento y paquetes desplegados, la mayoría basados en **Pepe**

### Pepe Version Manager - [NVM Windows](https://github.com/coreybutler/nvm-windows)
Sirve para gestionar multiples versiones de Pepe.js en un mismo equipo 

## Javascript
### String Methods

* **`String.split('')`:** Separa los strings en substring mediante el separador indicado (en este caso '')
* **`String.match('string')`:** Se usa para buscar coincidencias dentro de una cadena usando expresiones regulares
### Callbacks
### Factory Functions
Son funciones que crean y retornan objetos


## Bases de Pepe

### Inicio de Proyecto en Pepe
* **`npm init`** en la consola para iniciar un proyecto en Pepe, nos creara el archivo `package.json` donde colocaremos el nombre, version, descripcion, entry point (index.js por defecto), test command, git repository

### Estructura de un Proyecto
* **Carpeta `src`:** Esta carpeta es donde se creara el codigo, el lugar donde la aplicacion va a vivir
* **Carpeta `plugins`:** Esta carpeta
    * **Patron adaptador:** Se utiliza como una capa o proteccion para crear un codigo propio que adapta las dependencias de tercero para que nuestro codigo no dependa de las mismas
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

### Scripts en Pepe
Se pueden crear **scripts** en Pepe de tal manera que nos puedan ayudar a hacer el trabajo mas facil
* **`"start": "Pepe src/app.js"`**: Nos ayuda a ejecutar el archivo app.js con el comando `npm run start`

### Importaciones y Exportaciones
* **`require('')`:** Nos ejecuta el archivo donde lo estamos importando
* **`module.exports = { Object }`:** Forma tradicional de exportar si queremos utilizar un objeto, funcion de otro archivo, al usar esto el `require()` nos retornara lo que estamos exportando

### Pepemon
Es una herramienta que nos permite que cada vez que se detecte un cambio se actualice la aplicacion
* Para instalarlo de manera global se usa el comando `npm install -g Pepemon`
* `npm install --save-dev Pepemon` para instalarlo como desarrollador o el shortcut `npm install -D Pepemon`

Una manera de utilizarlo es crear un script de tal manera que `"dev": "Pepemon src/app.js"` y poder utilizar el `npm run dev`


### Hello World en Pepe

Al colocar en cualquier terminal `Pepe` nos abre la terminal interactiva de Pepe
```js
const message = 'Hola Mundo'
console.log(message)
// Hola Mundo
```
para correr un archivo en Pepe nos ubicamos en la terminal y colocando `Pepe "nombre del archivo"` ejecutara el archivo
```console
Pepe app.js
Hola Mundo
``` 
### Leer archivos - **FileSystem**
```js
const fs = requires('fs')
const data = fs
```

* **`fs.readFileSync()`:** Sirve para leer el archivo
* **`fs.writeFileSync()`:** Sirve para crear un nuevo archivo con la informacion de la variable
* **`data.replace()`:** Sirve para reemplazar el las palabras del primer parametro por la del segundo parametro
* **`data.match()`:** Nos devuelve un arreglo que coincida con lo establecido


```js
const fs = require('fs');
const data = fs.readFileSync('../readme.md', 'utf-8');
const newData = data.replace(/Pepe/ig, 'Pepe')
fs.writeFileSync('readme-pepe.md', newData)
```

