import Post from '../models/post.js';

export function createPost(post) {
    return Post.create(post)
}

export function findPostById(id) {
    return Post.findById(id)
}

export function deletePost(id) {
    return Post.findByIdAndDelete(id)
}

export function addLike(id) {
    return Post.updateOne({_id: id}, {$inc: {likes: 1}})
}

export function getPostsByAuthor(author) {
    return Post.find({author: author})
}

export function addComment(id, data) {
    return Post.findByIdAndUpdate(id, {$push: {comments: data}}, {returnDocument: 'after'})
}

export function findPostsByTags(tags) {
    return Post.find({tags: {$in: tags}})
}

export function findPostsByPeriod(from, to) {
    return Post.find({$and: [
                {dateCreated: {$gte: from}},
                {dateCreated: {$lte: to}}
            ]})
}

export function updatePost(id, data) {
    return Post.findByIdAndUpdate(id,{$set: data}, {returnDocument: 'after'})
}