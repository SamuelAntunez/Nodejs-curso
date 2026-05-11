import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {

    console.log('Client Connected')

    ws.on('error', console.error);

    ws.on('message', function message(data) {
        const payload = {
            type: 'custom-message',
            payload: data.toString()
        }

        //* Todos - Incluyente
        // wss.clients.forEach(function each(client) {
        //     if (client.readyState === WebSocket.OPEN) {
        //         client.send(JSON.stringify(payload), { binary: false });
        //     }
        // });

        //* Todos - Excluyente
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(payload), { binary: false });
            }
        });
        // ws.send(JSON.stringify(payload))

    });


    ws.on('close', () => {
        console.log('cliente desconectado')
    })


});

console.log('Server running on port http://localhost:3000')