import postRepository from "../repositories/post.repository.js";

async function checkPostAndReturnResult(id, callback, data) {
    const post = await callback(id, data)
    if (!post) {
        throw new Error(`Post with id = ${id} not found`)
    }
    return post
}

class PostService {
    async createPost(author, data) {
        const tags = [...new Set(data.tags)]
        return await postRepository.createPost({...data, author, tags})
    }

    async getPostById(id) {
        return checkPostAndReturnResult(id, postRepository.findPostById)
    }

    async deletePost(id) {
        return checkPostAndReturnResult(id, postRepository.deletePost)
    }

    async addLike(id) {
        const post = await postRepository.addLike(id)
        if (!post.matchedCount) {
            throw new Error(`Post with id = ${id} not found`)
        }
    }

    async getPostsByAuthor(author) {
        return postRepository.getPostsByAuthor(author)
    }

    async addComment(id, data) {
        return checkPostAndReturnResult(id, postRepository.addComment, data)
    }

    async getPostsByTags(tagsString) {
        const tagsIgnoreCase = tagsString?.split(',').map(tag => new RegExp(`^${tag}$`, 'i'))
        return postRepository.getPostsByTags(tagsIgnoreCase)
    }

    async getPostsByPeriod(dateFrom, dateTo) {
        const msFrom = new Date(dateFrom)
        const msTo = new Date(dateTo).setHours(23, 59, 59, 999)
        return postRepository.getPostsByPeriod(msFrom, msTo)
    }

    async updatePost(id, data) {
        return checkPostAndReturnResult(id, postRepository.updatePost, data)
    }
}

export default new PostService();