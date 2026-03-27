import postRepository from "../repositories/post.repository.js";

class PostService {
    async createPost(author, data) {
        const tags = [...new Set(data.tags)]
        return await postRepository.createPost({...data, author, tags})
    }

    async getPostById(id) {
            const post = await postRepository.findPostById(id)
            if (!post) {
                throw new Error(`Post with id = ${id} not found`)
            }
            return post
    }

    async deletePost(id) {
        const post = await postRepository.deletePost(id)
        if (!post) {
            throw new Error(`Post with id = ${id} not found`)
        }
        return post
    }

    async addLike(id) {
        // todo
        throw new Error('Not implemented');
    }

    async getPostsByAuthor(author) {
        // todo
        throw new Error('Not implemented');
    }

    async addComment(id, commenter, content) {
        // todo
        throw new Error('Not implemented');
    }

    async getPostsByTags(tagsString) {
        // todo
        throw new Error('Not implemented');
    }

    async getPostsByPeriod(dateFrom, dateTo) {
        // todo
        throw new Error('Not implemented');
    }

    async updatePost(id, data) {
        // todo
        throw new Error('Not implemented');
    }
}

export default new PostService();