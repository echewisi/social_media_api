
import { NotificationModel } from '../models/Notification';
import WebsocketService from './websocketService';
class NotificationService {
    async createNotification(userId: string, type: string, message: string): Promise<void> {
        try {
            const newNotification = new NotificationModel({ userId, type, message });
            await newNotification.save();

            // Emit websocket event with notification data
            WebsocketService.sendNotification({
                userId,
                type,
                message
            });
        } catch (error) {
            throw error;
        }
    }
}

export default new NotificationService();