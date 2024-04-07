import { WebSocketServer } from '../websocket/websocketServer';

class WebsocketService {
    private websocketServer: WebSocketServer;

    constructor(websocketServer: WebSocketServer) {
        this.websocketServer = websocketServer;
    }

    // Method to emit notifications to clients
    public sendNotification(notification: any): void {
        this.websocketServer.emitEvent('notification', notification);
    }
}

export default WebsocketService;
