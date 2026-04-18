import {Router} from "express";
import authorization from '../middlewares/authorization.middleware.js'
import {ADMIN, MODERATOR} from "../configuration/constants.js";

const router = Router()

router.all('/account/user/:login/role/:role', authorization.universalMethod({role: ADMIN}))
router.patch(['/account/user/:user', '/forum/post/:id/comment/:user'], authorization.universalMethod({paramName: 'user'}))
router.post('/forum/post/:author', authorization.universalMethod({paramName: 'author'}))
router.delete('/account/user/:login', authorization.universalMethod({paramName: 'login', role: ADMIN}))
router.patch('/forum/post/:id', authorization.universalMethod({postIdParam: 'id'}))
router.delete('/forum/post/:id', authorization.universalMethod({postIdParam: 'id', role: MODERATOR}))

export default router;