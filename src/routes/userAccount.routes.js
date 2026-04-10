import {Router} from 'express';
import userAccountController from "../controllers/userAccount.controller.js";

const router = Router();

router.post('/register', userAccountController.register);
router.post('/login', userAccountController.login);
router.delete('/user/:login', userAccountController.deleteUser);
router.patch('/user/:login', userAccountController.updateUser);
router.patch('/user/:login/role/:role', userAccountController.addRole);
router.delete('/user/:login/role/:role', userAccountController.deleteRole);
router.patch('/password', userAccountController.changePassword);
router.get('/user/:login', userAccountController.getUser);

export default router;