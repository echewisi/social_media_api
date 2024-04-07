import { Schema, model, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface Notification extends Document {
    _id: string;
    userId: string; // User ID of the recipient
    type: 'mention' | 'like' | 'comment'; // Type of notification
    message: string;
    postId?: string; // ID of the associated post (optional)
    commentId?: string; // ID of the associated comment (optional)
    read: boolean; // Flag indicating whether the notification has been read
    createdAt: Date; // Timestamp indicating when the notification was created
}

const notificationSchema = new Schema({
    _id: { type: String, default: uuidv4 }, // Using UUID as _id field
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Foreign key referencing the User model
    type: { type: String, enum: ['mention', 'like', 'comment'], required: true },
    message: {type: String, required: true},
    postId: { type: Schema.Types.ObjectId, ref: 'Post' },
    commentId: { type: Schema.Types.ObjectId, ref: 'Comment' },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

export const NotificationModel= model<Notification>('Notification', notificationSchema);
