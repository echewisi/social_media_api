// src/controllers/userController.ts

import { Request, Response } from 'express';
import UserService from '../services/userService';

class UserController {
    // Controller method to register a new user
    async registerUser(req: Request, res: Response): Promise<void> {
        try {
            const { username, email, password } = req.body;
            const newUser = await UserService.registerUser(username, email, password);
            res.status(201).json(newUser);
        } catch (error) {
            const errorMessage = (error as Error).message; // Type assertion
            res.status(400).json({ error: errorMessage });
        }
    }

    // Controller method to log in a user
    async loginUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const token = await UserService.loginUser(email, password);
            res.status(200).json({ token });
        } catch (error) {
            const errorMessage = (error as Error).message; // Type assertion
            res.status(401).json({ error: errorMessage });
        }
    }

    // Controller method to update user information
    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId; // Assuming you're passing userId in the request parameters
            const updates = req.body; // Assuming you're passing user updates in the request body
            const updatedUser = await UserService.updateUser(userId, updates);
            res.status(200).json(updatedUser);
        } catch (error) {
            const errorMessage = (error as Error).message; // Type assertion
            res.status(400).json({ error: errorMessage });
        }
    }


}

export default new UserController();
