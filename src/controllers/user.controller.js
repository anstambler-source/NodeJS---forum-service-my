import * as userService from '../services/user.service.js';

export const userRegister = async (req, res, next) => {
    try {
        const user = await userService.registerUser(req.body);
        return res.status(201).json(user);
    }catch(e) {
        next(e)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await userService.getUser(req.params.user);
        return res.json(user);
    }catch(e) {
        next(e);
    }
}

export const loginUser = async (req, res, next) => {
    return res.json(req.user);
}

export const deleteUser = async (req, res, next) => {
    try {
        const user = await userService.deleteUser(req.params.user);
        return res.json(user);
    }catch(e) {
        next(e);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const user = await userService.updateUser(req.params.user, req.body);
        return res.json(user);
    }catch(e) {
        next(e);
    }
}

export const addRole = async (req, res, next) => {
    try {
        const user = await userService.addRole(req.params.user, req.params.role);
        return res.json({login: user.login, roles: user.roles});
    }catch(e) {
        next(e);
    }
}

export const deleteRole = async (req, res, next) => {
    try {
        const user = await userService.deleteRole(req.params.user, req.params.role);
        return res.json({login: user.login, roles: user.roles});
    }catch(e) {
        next(e);
    }
}

export const changePassword = async (req, res, next) => {
    try {
        await userService.changePassword(req.user._id, req.body);
        return res.sendStatus(204)
    }catch(e) {
        next(e);
    }

}