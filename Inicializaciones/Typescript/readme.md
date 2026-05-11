# Node con TypeScript - TSX (Recomendado para ESM)

1. Instalar TypeScript y demás dependencias
```
npm i -D typescript @types/node tsx rimraf

```
2. Inicializar el archivo de configuración de TypeScript ( Se puede configurar al gusto)
```
npx tsc --init --outDir dist/ --rootDir src --module ESNext --moduleResolution Bundler --target ES2023 

```

3. Crear scripts para dev, build y start ([Más sobre TS-Node-dev aquí](https://www.npmjs.com/package/ts-node-dev))
```
"scripts": {
  "dev": "tsx watch src/app.ts",
  "build": "rimraf ./dist && tsc",
  "start": "node dist/app.js"
}

```
4. Configuracion ts.config

```
  "exclude": ["node_modules", "dist", "src/**/*.test.ts"],
  "include": ["src/**/*"],
```
5. Configuracion para ESM con prisma
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

# Node con TypeScript - TS-Node-dev 

1. Instalar TypeScript y demás dependencias
```
npm i -D typescript @types/node ts-node-dev rimraf
```
2. Inicializar el archivo de configuración de TypeScript ( Se puede configurar al gusto)
```
npx tsc --init --outDir dist/ --rootDir src
```

3. Crear scripts para dev, build y start ([Más sobre TS-Node-dev aquí](https://www.npmjs.com/package/ts-node-dev))
```
  "dev": "tsnd --respawn --clear src/app.ts",
  "build": "rimraf ./dist && tsc",
  "start": "npm run build && node dist/app.js"
```

# Pasos para usar Node con TypeScript con Nodemon

Más información - [Docs Oficiales](https://nodejs.org/en/learn/getting-started/nodejs-with-typescript)

1. Instalar TypeScript y tipos de Node, como dependencia de desarrollo
```
npm i -D typescript @types/node ts-node nodemon rimraf
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
  "dev": "nodemon",
  "build": "rimraf ./dist && tsc",
  "start": "npm run build && node dist/app.js"
```

9. Configuracion ts.config

```
  "exclude": ["node_modules", "dist", "src/**/*.test.ts"],
  "include": ["src/**/*"],
```