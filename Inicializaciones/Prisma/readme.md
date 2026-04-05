# Instalar Prisma-ORM

1. Create a new project

Create a project directory and navigate into it:
```bash
mkdir hello-prisma
cd hello-prisma
```
Initialize a TypeScript project:
```bash
npm init -y
npm install typescript tsx @types/node --save-dev
npx tsc --init
Install the packages needed for this quickstart:
```

2. Install Required Dependencies 

```bash
npm install prisma @types/node @types/pg --save-dev 
npm install @prisma/client @prisma/adapter-pg pg dotenv
```

## Here's what each package does:

* prisma - The Prisma CLI for running commands like prisma init, prisma migrate, and prisma generate
* @prisma/client - The Prisma Client library for querying your database
* @prisma/adapter-pg - The node-postgres driver adapter that connects Prisma Client to your database
* pg - The node-postgres database driver
* @types/pg - TypeScript type definitions for node-postgres
* dotenv - Loads environment variables from your .env file

3. Se modifica el archivo `schema.prisma` y tambien el URL que se usara en el archivo `.env` el url se modifica en el archivo `prisma.config.ts`

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```
```.env
POSTGRES_URL="postgresql://postgres:123456@localhost:5432/NOC-Postgres"
```

4. Initialize Prisma ORM and create a Prisma Postgres database
You can now invoke the Prisma CLI by prefixing it with npx:

```bash
npx prisma
```
Next, set up your Prisma ORM project by creating your Prisma Schema file with the following command:
```bash
npx prisma init --db --output ../generated/prisma
```
This command does a few things:

* Creates a prisma/ directory with a schema.prisma file containing your database connection and schema models
* Creates a new Prisma Postgres database (when using --db flag)
* Creates a .env file in the root directory for environment variables
* Creates a prisma.config.ts file for Prisma configuration

5. Define your data model

```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

6. Create and apply your first migration
Create your first migration to set up the database tables:
```bash
npx prisma migrate dev --name init
```
This command creates the database tables based on your schema.

Now run the following command to generate the Prisma Client:
```bash
npx prisma generate
```

7. Instantiate Prisma Client

Create a lib/prismas.ts

```ts
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client";
import { envs } from "../../../config/plugins/envs";


const connectionString = envs.POSTGRES_URL;
const adapter = new PrismaPg(connectionString);
const prisma = new PrismaClient({ adapter });

export { prisma }
```

8. Importante correr prisma con `tsx` ya que `ts-node` no soporta todavia ESM

9. Crear y Save

```ts
    const newLog = await prisma.logModel.create({
        data: {
            message: 'Hello World',
            origin: 'test',
            level: 'LOW'
        }
    });

    console.log({ newLog })
```

10. Get

```ts
    const logs = await prisma.logModel.findMany({
        where: {
            level: 'MEDIUM' // Parametros para la busqueda y conseguir 
        }
    })
    console.log(logs)
```

# NOTAS
- Para solucionar el problema de importacion en archivo `lib/prisma.ts` se debe cambiar el outputh en el `schema.prisma` y colocar ```ts output   = "../src/generated" ``` esto ocurre porque TypeScript usa la propiedad rootDir para determinar la estructura de la carpeta de salida (dist). Si intentas importar un archivo que está "más arriba" o fuera de esa carpeta, TypeScript se confunde porque no sabe cómo replicar esa jerarquía en la carpeta final de compilación.