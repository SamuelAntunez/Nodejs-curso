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
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    "rootDir": "src",
    "outDir": "dist/",
    // Environment Settings
    // See also https://aka.ms/tsconfig/module
    "module": "nodenext",
    "target": "es2023",
    // "types": [],
    // For nodejs:
    "lib": [
      "esnext"
    ],
    "types": [
      "node"
    ],
    // and npm install -D @types/node
    // Other Outputs
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    // Stricter Typechecking Options
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    // Style Options
    // "noImplicitReturns": true,
    // "noImplicitOverride": true,
    // "noUnusedLocals": true,
    // "noUnusedParameters": true,
    // "noFallthroughCasesInSwitch": true,
    // "noPropertyAccessFromIndexSignature": true,
    // Recommended Options
    "strict": true,
    "jsx": "react-jsx",
    // "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true,
    "moduleResolution": "nodenext",
  },
  "exclude": [
    "node_modules",
    "dist",
    "src/**/*.test.ts"
  ],
  "include": [
    "src/**/*"
  ],
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
