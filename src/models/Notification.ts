import { Schema, model, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface Notification extends Document {
    _id: string;
    userId: string; // User ID associated with the notification
    message: string; // Notification message
    createdAt: Date; // Timestamp for when the notification was created
}

const notificationSchema = new Schema<Notification>({
    _id: { type: String, default: uuidv4 }, // Using UUID as _id field
    userId: { type: String, required: true }, // User ID associated with the notification
    message: { type: String, required: true }, // Notification message
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

export default model<Notification>('Notification', notificationSchema);
