import postService from "../services/post.service.js";

class PostController {
    async createPost(req, res, next) {
        try{
            const post = await postService.createPost(req.params.author, req.body);
            return res.status(201).json(post);
        }catch(e){
            return next(e);
        }
    }

    async getPostById(req, res, next) {
        try{
            const post = await postService.getPostById(req.params.id);
            return res.status(200).json(post);
        }catch(e){
            return next(e);
        }
    }

    async deletePost(req, res, next) {
        // todo handle service post deletion
        throw new Error('Not implemented');
    }

    async addLike(req, res, next) {
        // todo
        throw new Error('Not implemented');
    }

    async getPostsByAuthor(req, res, next) {
        // todo
        throw new Error('Not implemented');
    }

    async addComment(req, res, next) {
        // todo
        throw new Error('Not implemented');
    }

    async getPostsByTags(req, res, next) {
        // todo
        throw new Error('Not implemented');
    }

    async getPostsByPeriod(req, res, next) {
        // todo
        throw new Error('Not implemented');
    }

    async updatePost(req, res, next) {
        // todo
        throw new Error('Not implemented');
    }
}

export default new PostController();