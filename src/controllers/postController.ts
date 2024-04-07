
import { Request, Response } from 'express';
import PostService from '../services/postService';

class PostController {
    // Method to create a new post
    public async createPost(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.body; // Assuming userId is extracted from the request body
            const { content, attachments } = req.body; // Assuming content and attachments are extracted from the request body
            const newPost = await PostService.createPost(userId, content, attachments);
            res.status(201).json(newPost);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Method to like a post
    public async likePost(req: Request, res: Response): Promise<void> {
        try {
            const { postId, userId } = req.body; // Assuming postId and userId are extracted from the request body
            const likedPost = await PostService.likePost(postId, userId);
            res.status(200).json(likedPost);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Method to delete a post
    public async deletePost(req: Request, res: Response): Promise<void> {
        try {
            const { postId } = req.params; // Assuming postId is extracted from the request parameters
            await PostService.deletePost(postId);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Method to update a post
    public async updatePost(req: Request, res: Response): Promise<void> {
        try {
            const { postId } = req.params; // Assuming postId is extracted from the request parameters
            const updates = req.body; // Assuming updates are provided in the request body
            const updatedPost = await PostService.updatePost(postId, updates);
            res.status(200).json(updatedPost);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Method to fetch posts from users followed by the current user
    public async getFeed(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params; // Assuming userId is extracted from the request parameters
            const  page  = Number(req.query.page); // Assuming pagination parameters are provided in the query string
            const limit= Number(req.query.limit);
            const posts = await PostService.getFeed(userId, +page, +limit);
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Method to get the number of likes for a post
    public async getLikesCount(req: Request, res: Response): Promise<void> {
        try {
            const { postId } = req.params; // Assuming postId is extracted from the request parameters
            const likesCount = await PostService.getLikesCount(postId);
            res.status(200).json({ likesCount });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Method to get the number of comments for a post
    public async getCommentsCount(req: Request, res: Response): Promise<void> {
        try {
            const { postId } = req.params; // Assuming postId is extracted from the request parameters
            const commentsCount = await PostService.getCommentsCount(postId);
            res.status(200).json({ commentsCount });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default new PostController();
