import { Schema, model, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface Comment extends Document {
    _id: string;
    content: string;
    post: string; // Foreign key referencing the Post model
    author: string; // Foreign key referencing the User model
    // Add any additional fields you need
}

const commentSchema = new Schema({
    _id: { type: String, default: uuidv4 }, // Using UUID as _id field
    content: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }, // Foreign key referencing the Post model
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Foreign key referencing the User model

});

export default model<Comment>('Comment', commentSchema);
