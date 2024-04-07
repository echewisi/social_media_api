import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import config from '../config'
import { UserModel } from '../models/User';

class UserService {
    async registerUser(username: string, email: string, password: string): Promise<any> {
        try {
            // Check if the user already exists
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                throw new Error('User with this email already exists');
            }
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            // Create a new user with hashed password
            const newUser = new UserModel({ username, email, password: hashedPassword });
            await newUser.save();
            return newUser;
        } catch (error) {
            throw error;
        }
    }

    async loginUser(email: string, password: string): Promise<string> {
        try {
            // Find the user by email
            const user = await UserModel.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }
            // Compare the provided password with the hashed password stored in the database
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }
            // Generate JWT token
            const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1d' });
            return token;
        } catch (error) {
            throw error;
        }
    }

        // Method to update user information
    async updateUser(userId: string, updates: Partial< typeof UserModel>): Promise<any> {
            try {
                const user = await UserModel.findByIdAndUpdate(userId, updates, { new: true });
                if (!user) {
                    throw new Error('User not found');
                }
                return user;
            } catch (error) {
                throw error;
            }
        }
}


export default new UserService();