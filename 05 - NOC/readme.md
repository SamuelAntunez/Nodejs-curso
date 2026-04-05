# NOC (Network Operations Center) - App

Un NOC es un centro de operaciones de red que se encarga de monitorear y mantener la red en funcionamiento.v

## Objetivos

* Ejecutar codigo en momentos especificos
* Monitorear un API
* Crear tus propios procesos de monitoreo
* Enviar Correos
* Grabar LOGS en:
    * fileSystem
    * MongoDB
    * PostgreSQL

> Este codigo funciona como un caso de uso

## Explicacion codigo 

### src/presentation/server.ts 

```typescript

    public static start() {
        console.log('Server started... ')
    }
    
    // El static sirve para poder ejecutar la funcion sin necesidad de crear una instancia de la clase
```

### Entities

Aqui es donde van a llegar toda la informacion que se va a guardar en la base de datos, en el caso de `logs` es donde se van a guardar los logs de la aplicacion, si fueran clientes se utilizaria la entidad `client`

### inyeccion de dependencias
```typsecript
    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) { }

    // Inyeccion de dependencias 
```
> Los callbacks se definen cuando creas la instancia con new CheckService(...), pero se ejecutan más tarde dentro del método 
execute() dependiendo del resultado del fetch. Es como darle instrucciones al servicio: "Si todo sale bien, haz esto; si falla, haz esto otro".

### Dependencias utilizadas

* **cron**: 