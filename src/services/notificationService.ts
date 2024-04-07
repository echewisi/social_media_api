// src/services/notificationService.ts

import { NotificationModel } from '../models/Notification';

class NotificationService {
    async createNotification(userId: string, type: string, message: string): Promise<void> {
        try {
            const newNotification = new NotificationModel({ userId, type, message });
            await newNotification.save();
        } catch (error) {
            throw error;
        }
    }

    // Other methods...
}

export default new NotificationService();
