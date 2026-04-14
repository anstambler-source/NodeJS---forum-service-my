import userAccountService from "../services/userAccount.service.js";

class UserAccountController {
    async register(req, res, next) {
        try {
            const userAccount = await userAccountService.register(req.body);
            return res.status(201).json(userAccount);
        } catch (err) {
            return next(err);
        }
    }

    async login(req, res, next) {
        const userAccount = await userAccountService.getUser(req.principal.userName)
        return res.json(userAccount);
    }

    async deleteUser(req, res, next) {
        try {
            const userAccount = await userAccountService.removeUser(req.params.login);
            return res.json(userAccount);
        } catch (err) {
            return next(err);
        }
    }

    async updateUser(req, res, next) {
        try {
            const userAccount = await userAccountService.updateUser(req.params.login, req.body);
            return res.json(userAccount);
        } catch (err) {
            return next(err);
        }
    }

    async addRole(req, res, next) {
        try {
            const userRoles = await userAccountService.changeRoles(req.params.login, req.params.role, true);
            return res.json(userRoles);
            // return res.json(userRoles.toJSON({hidePersonal: true}));
        } catch (err) {
            return next(err);
        }
    }

    async deleteRole(req, res, next) {
        try {
            const userRoles = await userAccountService.changeRoles(req.params.login, req.params.role, false);
            return res.json(userRoles);
            // return res.json(userRoles.toJSON({hidePersonal: true}));
        } catch (err) {
            return next(err);
        }
    }

    async changePassword(req, res, next) {
        await userAccountService.changePassword(req.principal.userName, req.body.password)
        return res.sendStatus(204)
    }

    async getUser(req, res, next) {
        try {
            const user = await userAccountService.getUser(req.params.login);
            return res.json(user);
        } catch (err) {
            return next(err);
        }
    }
}

export default new UserAccountController();