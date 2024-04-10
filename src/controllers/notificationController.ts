import { Request, Response } from 'express';
import NotificationService from '../services/notificationService';

class NotificationController {
    private notificationService: NotificationService;

    constructor(notificationService: NotificationService) {
        this.notificationService = notificationService;
    }

    // Method to handle sending notifications
    public sendNotification(req: Request, res: Response): void {
        try {
            // Extract notification data from request body
            const notificationData = req.body;

            // Send notification using NotificationService
            this.notificationService.sendNotification(notificationData);

            // Respond with success message
            res.status(200).json({ message: 'Notification sent successfully' });
        } catch (error) {
            // Handle errors and respond with appropriate status code
            console.error('Error sending notification:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default NotificationController;
