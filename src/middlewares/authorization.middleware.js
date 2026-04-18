import postService from "../services/post.service.js";

class Authorization {
    universalMethod(data) {
        return async (req, res, next) => {
            const hasRole = req.principal.roles.includes(data.role?.toUpperCase().trim());
            const isOwner = req.params[data.paramName] === req.principal.userName;
            const postID = req.params[data.postIdParam];
            const post = postID && await postService.getPostById(postID);
            const isAuthor = req.principal.userName === post?.author;
            const arr = [hasRole, isOwner, isAuthor]
            const hasAnyTrue = arr.some(el => el)
            return hasAnyTrue ? next() : res.status(403).json({message: 'Access denied'});
        }
    }
}

export default new Authorization();