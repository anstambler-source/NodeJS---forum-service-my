import * as repo from '../repositories/post.repository.js'
import mongoose from "mongoose";

class PostService {
    async createPost(author, {title, content, tags}) {
        return repo.createPost({
            author,
            title,
            dateCreated: new Date().toISOString(),
            content,
            tags})
    }

    async getPostById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Id is invalid');
        }
        const post = await repo.findPostById(id)
        if (!post) {
            const error = new Error('Post not found');
            error.id = id
            throw error
        }
        return post;
    }
}

export default new PostService();