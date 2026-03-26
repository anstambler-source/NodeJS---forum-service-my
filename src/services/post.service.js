import * as repo from '../repositories/post.repository.js'
import mongoose from "mongoose";

async function checkValidIdAndReturnResult(id, callback, data) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Id is invalid');
    }
    const post = await callback(id, data)
    if (!post || post.matchedCount === 0) {
        const error = new Error('Post not found');
        error.id = id
        throw error
    }
    return post;
}

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
        return checkValidIdAndReturnResult(id, repo.findPostById);
    }

    async deletePost(id) {
        return checkValidIdAndReturnResult(id, repo.deletePost)
    }

    async addLike(id) {
        return checkValidIdAndReturnResult(id, repo.addLike);
    }

    async getPostsByAuthor(author) {
        return repo.getPostsByAuthor(author)
    }

    async addComment(id, data) {
        return checkValidIdAndReturnResult(id, repo.addComment, {...data, dateCreated: new Date().toISOString()});
    }

    async findPostsByTags(tags) {
        const tagsIgnoreCase = tags.reduce((acc, tag) => {
            acc.push(...tag?.split(',').map(t => new RegExp(`^${t}$`, 'i')))
            return acc;
        }, [])
        return repo.findPostsByTags(tagsIgnoreCase)
    }

    async findPostsByPeriod(from, to) {
        const msFrom = new Date(from).toISOString()
        const msTo = new Date(to).toISOString()
        return repo.findPostsByPeriod(msFrom, msTo)
    }

    async updatePost(id, data) {
        return checkValidIdAndReturnResult(id, repo.updatePost, data)
    }
}

export default new PostService();