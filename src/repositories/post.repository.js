import Post from '../models/post.model.js'

class PostRepository {
    async createPost(postData) {
        // const post = new Post(postData);
        // return post.save()
        return Post.create(postData)
    }

    async findPostById(id) {
        return Post.findById(id).exec()
    }

    async deletePost(id) {
        return Post.findByIdAndDelete(id).exec();
    }

    async addLike(id) {
        return Post.findByIdAndUpdate(id, {$inc: {likes: 1}}, {new: true}).exec()
    }

    async findPostByAuthor(author) {
        return Post.find({author: new RegExp(`^${author}$`, 'i')}).exec();
    }

    async addComment(id, comment) {
        return Post.findByIdAndUpdate(id, {$push: {comments: comment}}, {new: true}).exec();
    }

    async findPostsByTags(tags) {
        const regexConditions = tags.map(tag => ({tags: new RegExp(`^${tag}$`, 'i')}));
        return Post.find({$or: regexConditions}).exec()
    }

    async updatePost(id, updateData) {
        const tags = updateData.tags ?? [];
        delete updateData.tags;
        const data = {...updateData, $addToSet: {tags}};
        return Post.findByIdAndUpdate(id, data, {new: true}).exec()
    }

    async findPostsByPeriod (dateFrom, dateTo) {
        return Post.find({dateCreated: {$gte: dateFrom, $lte: dateTo}}).exec()
    }
}

export default new PostRepository()