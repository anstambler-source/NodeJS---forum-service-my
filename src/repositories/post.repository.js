import Post from '../models/post.js';

export function createPost(post) {
    return Post.create(post)
}

export function findPostById(id) {
    return Post.findById(id)
}