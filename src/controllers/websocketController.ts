// src/controllers/websocketController.ts

import { Request, Response } from 'express';
import { WebSocketServer } from '../websocket/websocketServer';

class WebsocketController {
    private websocketServer: WebSocketServer;

    constructor(websocketServer: WebSocketServer) {
        this.websocketServer = websocketServer;
    }

    // Example method to handle notifications
    public handleNotification(req: Request, res: Response): void {
        try {
            const notificationData = req.body; // Assuming notification data is passed in the request body
            this.websocketServer.emitEvent('notification', notificationData);
            res.status(200).json({ message: 'Notification sent successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default WebsocketController;
