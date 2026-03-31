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
            return res.json(post);
        }catch(e){
            return next(e);
        }
    }

    async deletePost(req, res, next) {
        try{
            const post = await postService.deletePost(req.params.id);
            return res.json(post);
        }catch(e){
            return next(e);
        }
    }

    async addLike(req, res, next) {
        try{
            await postService.addLike(req.params.id);
            return res.sendStatus(204);
        }catch(e){
            return next(e);
        }
    }

    async getPostsByAuthor(req, res, next) {
        return res.json(await postService.getPostsByAuthor(req.params.author));
    }

    async addComment(req, res, next) {
        try{
            const post = await postService.addComment(req.params.id, req.params.commenter, req.body.message);
            return res.json(post);
        }catch(e){
            return next(e);
        }
    }

    async getPostsByTags(req, res, next) {
        let values = req.query.values;
        if(Array.isArray(req.query.values)){
            values = req.query.values.join(',')
        }
        console.log(values)
        return res.json(await postService.getPostsByTags(values));
    }

    async getPostsByPeriod(req, res, next) {
            const {dateFrom, dateTo} = req.query;
            return res.json(await postService.getPostsByPeriod(dateFrom, dateTo));
    }

    async updatePost(req, res, next) {
        try{
            const post = await postService.updatePost(req.params.id, req.body);
            return res.json(post);
        }catch(e){
            return next(e);
        }
    }
}

export default new PostController();