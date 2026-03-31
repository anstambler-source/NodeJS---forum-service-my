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
        const post = await postRepository.addLike(id);
        if (!post) {
            throw new Error(`Post with id = ${id} not found`)
        }
        return post;
    }

    async getPostsByAuthor(author) {
        return await postRepository.findPostByAuthor(author);
    }

    async addComment(id, commenter, content) {
        const comment = {user: commenter, message: content};
        const post = await postRepository.addComment(id, comment);
        if (!post) {
            throw new Error(`Post with id = ${id} not found`)
        }
        return post;
    }

    async getPostsByTags(tagsString) {
        const tags = tagsString.split(',').map(tag => tag.trim());
        return await postRepository.findPostsByTags(tags);
    }

    async getPostsByPeriod(dateFrom, dateTo) {
        return await postRepository.findPostsByPeriod(new Date(dateFrom), new Date(dateTo));
    }

    async updatePost(id, data) {
        const post = await postRepository.updatePost(id, data);
        if (!post) {
            throw new Error(`Post with id = ${id} not found`)
        }
        return post;
    }
}

export default new PostService();