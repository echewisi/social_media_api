// src/services/postService.ts

import { PostModel } from '../models/Post';
import { UserModel } from '../models/User';

class PostService {
    // Method to create a new post
    async createPost(authorId: string, content: string, attachments: string[]): Promise<any> {
        try {
            const newPost = new PostModel({ author: authorId, content, attachments });
            await newPost.save();
            return newPost;
        } catch (error) {
            throw error;
        }
    }

    // Method to like a post
    async likePost(postId: string, userId: string): Promise<any> {
        try {
            const post = await PostModel.findById(postId);
            if (!post) {
                throw new Error('Post not found');
            }
            // Check if the user already liked the post
            if (post.likes.includes(userId)) {
                throw new Error('User already liked this post');
            }
            // Add user to likes array
            post.likes.push(userId);
            await post.save();
            return post;
        } catch (error) {
            throw error;
        }
    }

    // Method to delete a post
    async deletePost(postId: string): Promise<void> {
        try {
            const deletedPost = await PostModel.findByIdAndDelete(postId);
            if (!deletedPost) {
                throw new Error('Post not found');
            }
        } catch (error) {
            throw error;
        }
    }

    // Method to update a post
    async updatePost(postId: string, updates: Partial<typeof PostModel>): Promise<any> {
        try {
            const updatedPost = await PostModel.findByIdAndUpdate(postId, updates, { new: true });
            if (!updatedPost) {
                throw new Error('Post not found');
            }
            return updatedPost;
        } catch (error) {
            throw error;
        }
    }

    // Method to fetch posts from users followed by the current user
    async getFeed(userId: string, page: number, limit: number): Promise<any> {
        try {
            const currentUser = await UserModel.findById(userId);
            if (!currentUser) {
                throw new Error('User not found');
            }
            const following = currentUser.following; // Assuming `following` is an array of user IDs the current user is following
            const posts = await PostModel.find({ author: { $in: following } })
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .populate('author', 'username') // Populate author details
                .populate('likes', 'username'); // Populate likes details
            return posts;
        } catch (error) {
            throw error;
        }
    }

    // Method to get the number of likes for a post
    async getLikesCount(postId: string): Promise<number> {
            try {
                const post = await PostModel.findById(postId);
                if (!post) {
                    throw new Error('Post not found');
                }
                return post.likes.length;
            } catch (error) {
                throw error;
            }
        }
    
    // Method to get the number of comments for a post
    async getCommentsCount(postId: string): Promise<number> {
        try {
            // Assuming you have a 'comments' field in your Post model containing comment IDs
            const post = await PostModel.findById(postId).populate('comments');
            if (!post) {
                throw new Error('Post not found');
            }
            return post.comments.length;
        } catch (error) {
            throw error;
        }
    }
    
}

export default new PostService();
