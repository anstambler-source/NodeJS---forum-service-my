import Post from '../models/post.model.js'

class PostRepository {
    async createPost(postData) {
        // const post = new Post(postData);
        // return post.save()
        return Post.create(postData)
    }

    async findPostById(id) {
        return Post.findById(id)
    }

    async deletePost(id) {
        return Post.findByIdAndDelete(id);
    }

    async addLike(id) {
        return Post.updateOne({_id: id}, {$inc: {likes: 1}})
    }

    async getPostsByAuthor(author) {
        return Post.find({author: author})
    }

    async addComment(id, data) {
        return Post.findByIdAndUpdate(id, {$push: {comments: data}}, {returnDocument: 'after'})
    }

    async getPostsByTags(tags) {
        return Post.find({tags: {$in: tags}})
    }

    async getPostsByPeriod(from, to) {
        return Post.find({$and: [
                {dateCreated: {$gte: from}},
                {dateCreated: {$lte: to}}
            ]})
    }

    async updatePost(id, data) {
        return Post.findByIdAndUpdate(id,{$set: data}, {returnDocument: 'after'})
    }
}

export default new PostRepository()