// src/websocket/websocketServer.ts

import { Server as HttpServer } from 'http';
import { Server as IoServer, Socket } from 'socket.io';

export class WebSocketServer {
    private io: IoServer;

    constructor(server: HttpServer) {
        this.io = new IoServer(server);

        this.io.on('connection', (socket: Socket) => {
            console.log('A client connected');

            // Handle events
            socket.on('disconnect', () => {
                console.log('A client disconnected');
            });

        });
    }

    // Method to emit events to clients
    public emitEvent(eventName: string, eventData: any): void {
        this.io.emit(eventName, eventData);
    }
}
