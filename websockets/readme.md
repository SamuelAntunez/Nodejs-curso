# 🚀 Curso Node.js - WebSockets Básicos

Este proyecto es una demostración práctica de cómo implementar **WebSockets** tanto en el lado del servidor (Backend con Node.js) como en el lado del cliente (Frontend con Vanilla JavaScript). 

Los WebSockets permiten una comunicación **bidireccional** y en **tiempo real** entre el cliente y el servidor. A diferencia de las peticiones HTTP tradicionales (donde el cliente pregunta y el servidor responde), con WebSockets el servidor puede enviar datos al cliente en cualquier momento sin que este se lo pida.

---

## 📂 Estructura del Proyecto

El proyecto se divide principalmente en dos partes:

*   **`src/app.ts`**: Contiene el código del servidor (Backend) escrito en TypeScript.
*   **`public/index.html`**: Contiene el código del cliente (Frontend) construido con HTML y JavaScript nativo.
*   **`package.json`**: Gestiona las dependencias del proyecto y los scripts de ejecución.

---

## 🖥️ 1. El Servidor (Backend) - `src/app.ts`

El servidor está construido usando la librería `ws`, que es una implementación muy rápida, robusta y ampliamente utilizada de WebSockets para Node.js.

### ¿Qué hace el código paso a paso?

1.  **Inicialización del Servidor:**
    ```typescript
    import { WebSocketServer } from 'ws';
    const wss = new WebSocketServer({ port: 3000 });
    ```
    Importamos la clase `WebSocketServer` e instanciamos un nuevo servidor escuchando en el puerto `3000`.

2.  **Escuchar Nuevas Conexiones:**
    ```typescript
    wss.on('connection', function connection(ws) { ... });
    ```
    El evento `connection` se dispara cada vez que un nuevo cliente (un navegador, por ejemplo) se conecta a nuestro servidor. El argumento `ws` representa *esa* conexión específica y única con *ese* cliente.

3.  **Recibir y Formatear Mensajes:**
    ```typescript
    ws.on('message', function message(data) {
        const payload = {
            type: 'custom-message',
            payload: data.toString()
        }
        // ...
    });
    ```
    Cuando el servidor recibe un mensaje a través de una conexión (`ws.on('message')`), lo empaqueta en un objeto JSON (`payload`). Esto es una buena práctica para darle una estructura estándar a todos los mensajes (tipo de mensaje y contenido).

4.  **Estrategias de Emisión (Broadcasting):**
    El código ilustra dos formas de propagar los mensajes al resto de clientes conectados:

    *   **Todos - Incluyente (Comentado en el código):** Envía el mensaje a *absolutamente todos* los clientes conectados al servidor, incluyendo al cliente que envió originalmente el mensaje.
    *   **Todos - Excluyente (Activo):** 
        ```typescript
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(payload), { binary: false });
            }
        });
        ```
        Itera sobre todos los clientes conectados (`wss.clients`). Si el cliente en turno de la iteración *no es* el cliente que envió el mensaje (`client !== ws`) y su conexión está abierta y lista, entonces le envía el mensaje. **Esta es la estrategia ideal para un chat**, para que a ti no te reboten tus propios mensajes.

---

## 🌐 2. El Cliente (Frontend) - `public/index.html`

El cliente es una página HTML sencilla que utiliza Vanilla JavaScript (sin frameworks). Hace uso de la **API nativa de WebSocket** que ya viene incluida en todos los navegadores web modernos.

### ¿Qué hace el código paso a paso?

1.  **Conectar al Servidor:**
    ```javascript
    const socket = new WebSocket('ws://localhost:3000');
    ```
    Inicia la conexión con nuestro servidor local en el puerto 3000. Fíjate que utiliza el protocolo `ws://` (WebSocket) en lugar del tradicional `http://`.

2.  **Manejo del Estado de la Conexión:**
    ```javascript
    socket.onopen = (event) => {
        statusElem.innerText = 'Conectado';
    }
    ```
    El evento `onopen` se ejecuta en el momento en que el canal bidireccional se establece con éxito. Aprovechamos para actualizar un texto en la interfaz y mostrarle al usuario que está "Conectado".

3.  **Reconexión Automática (Resiliencia):**
    ```javascript
    socket.onclose = (event) => {
        statusElem.innerText = 'Desconectado';
        setTimeout(() => {
            connectToServer();
        }, 2000);
    }
    ```
    Si el servidor se cae, se reinicia o el cliente pierde su conexión a internet, se dispara `onclose`. 
    *   **✨ Detalle Didáctico / Buena Práctica:** Aquí se implementa un patrón fundamental en aplicaciones de tiempo real: el intento de **reconexión automática**. Esperamos 2 segundos (`setTimeout`) y volvemos a llamar a la función `connectToServer()` para intentar reconectar.

4.  **Enviar Mensajes:**
    Al dispararse el evento `submit` del formulario, se previene el comportamiento por defecto de recargar la página (`event.preventDefault()`). Se captura el valor del input y se envía hacia el servidor usando el método `socket.send(message)`.

5.  **Recibir Mensajes del Servidor:**
    ```javascript
    socket.onmessage = (event) => {
        const { payload } = JSON.parse(event.data);
        renderMessage(payload);
    }
    ```
    Cuando el servidor emite un mensaje y el navegador lo recibe, se dispara `onmessage`. Convertimos el mensaje de formato String/JSON a un objeto real de JavaScript usando `JSON.parse`. Luego, extraemos el contenido real (`payload`) y creamos un nuevo elemento `<li>` en la lista usando la función auxiliar `renderMessage`. (Se usa `prepend` para que el mensaje nuevo aparezca en la parte superior de la lista de mensajes).

---

## 🛠️ Cómo ejecutar este proyecto

1.  Abre una terminal en la carpeta principal del proyecto y asegúrate de instalar las dependencias:
    ```bash
    npm install
    ```
2.  Ejecuta el servidor de desarrollo (que utiliza `tsx` para compilar y ejecutar TypeScript con recarga automática):
    ```bash
    npm run dev
    ```
3.  Abre el archivo `public/index.html` en tu navegador. 
    *   Puedes usar extensiones como **Live Server** en VSCode.
    *   O puedes usar el comando local sugerido previamente: `npx http-server public/ -o`
4.  **¡Prueba la magia!** Abre dos o tres pestañas diferentes de tu navegador en la misma página local. Escribe un mensaje en una pestaña y verás cómo aparece de forma instantánea en todas las demás gracias al WebSocket.

---

## 💡 Conceptos Clave Aprendidos

*   **WebSockets:** Protocolo de red persistente que permite la comunicación de doble vía continua entre cliente y servidor.
*   **ws vs http:** El protocolo WebSockets utiliza el prefijo `ws://` (o `wss://` para conexiones seguras SSL/TLS), muy diferente a las clásicas rutas estáticas de `http://`.
*   **Broadcasting (Emisión):** El patrón de enviar un mismo mensaje o conjunto de datos a múltiples receptores simultáneamente.
*   **Arquitectura basada en eventos:** El flujo de una aplicación de WebSockets está gobernado por eventos que ocurren en el tiempo (`onopen`, `onmessage`, `onclose`, `onerror`).
*   **Reconexión Automática:** Una estrategia de manejo de errores obligatoria para asegurar que el usuario retome la comunicación en el momento que la red o el servicio vuelve a estar disponible.