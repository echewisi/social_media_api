// src/models/Post.ts

import { Schema, model, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface Post extends Document {
    _id: string;
    content: string;
    author: string; // Foreign key referencing the User model
    likes: string[]; // Array of user IDs who liked the post
    comments: string[]; // Array of comment IDs
    attachments: string[];
}

const postSchema = new Schema({
    _id: { type: String, default: uuidv4 }, // Using UUID as _id field
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Foreign key referencing the User model
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs who liked the post
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], // Array of comment IDs referencing the Comment model
    attachments: [{ type: String, required: false }]
});

export const PostModel = model<Post>('Post', postSchema);
