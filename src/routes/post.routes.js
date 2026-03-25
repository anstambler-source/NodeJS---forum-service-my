import {Router} from 'express';
import postController from "../controllers/post.controller.js";

const router = Router();

router.post('/post/:author', postController.createPost);
router.get('/post/:id', postController.getPostById)
router.delete('/post/:id', postController.deletePost);
router.patch('/post/:id/like', postController.addLike)
router.get('/posts/author/:author', postController.getPostsByAuthor)
router.patch('/post/:id/comment/:commenter', postController.addComment)
router.get('/posts/tags', postController.getPostsByTags)
router.get('/posts/period', postController.getPostsByPeriod)
router.patch('/post/:id', postController.updatePost)

export default router;