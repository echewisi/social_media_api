import { Schema, model, Document, trusted} from "mongoose";
import { v4 as uuidv4 } from 'uuid';

interface User extends Document{
    id: string;
    username: string;
    email: string;
    password: string;
    following: string[];
}

const userSchema= new Schema<User>({
    id: {type: String, default: uuidv4},
    username: {type: String, required: true, unique: false},
    email: {type: String, required: true, unique: true},
    password: {type: String, required:true, unique: true},
    following: [{type: String, ref: 'User'}]
})

export const UserModel= model<User>('User', userSchema);