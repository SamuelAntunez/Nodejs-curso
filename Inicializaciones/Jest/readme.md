# Pasos para configurar Jest con TypeScript, en Node 

Documentación [oficial sobre Jest](https://jestjs.io/docs/getting-started)


1. Instalaciones de desarrollo (super test es útil para probar Express)
```
npm install -D jest @types/jest ts-jest supertest
npm install --save-dev jest typescript ts-jest @types/jest supertest

```

2. Crear archivo de configuración de Jest
```
npx ts-jest config:init // predeterminado
npx create-jest // mas opciones
```

3. En el archivo **jest.config.js** configurar
```
preset: 'ts-jest',
testEnvironment: "jest-environment-node",

// Opcional - The paths to modules that run some code to configure or set up the testing environment before each test
// setupFiles: ['dotenv/config'],
```

4. Crear scripts en el **package.json**
```
"test": "jest",
"test:watch": "jest --watch",
"test:coverage": "jest --coverage",
```
5. Para errores en el tsconfig.json 
```
  "exclude": ["jest.config.ts"]
```

6. Importar
```
import {describe, expect, test} from '@jest/globals';
```