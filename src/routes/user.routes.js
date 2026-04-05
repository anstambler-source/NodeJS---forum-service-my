import {Router} from "express";
import {
    updateUser,
    getUser,
    loginUser,
    userRegister,
    deleteUser,
    addRole,
    deleteRole, changePassword
} from "../controllers/user.controller.js";
import basicAuth from "../middlewares/basicAuth.middleware.js";
import validate from "../middlewares/validationUser.middleware.js";

const router = Router()

router.post('/register', validate('userRegister'), userRegister)
router.get('/user/:user', basicAuth, getUser)
router.post('/login', basicAuth, loginUser)
router.delete('/user/:user', basicAuth, deleteUser)
router.patch('/user/:user', basicAuth, validate('updateUser'), updateUser)
router.patch('/user/:user/role/:role', basicAuth, addRole)
router.delete('/user/:user/role/:role', basicAuth, deleteRole)
router.patch('/password', basicAuth, validate('changePassword'), changePassword)


export default router;