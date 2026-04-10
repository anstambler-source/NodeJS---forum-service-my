import userAccountRepository from "../repositories/userAccount.repository.js";

class UserAccountService {
    async register(user) {
        try {
            return await userAccountRepository.addUser(user)
        } catch (e) {
            console.log(e)
            throw new Error('User account already exists')
        }
    }

    async removeUser(login) {
        const userAccount = await userAccountRepository.removeUser(login)
        if (!userAccount) {
            throw new Error(`User with login ${login} not found`)
        }
        return userAccount
    }

    async updateUser(login, updateData) {
        const userAccount = await userAccountRepository.updateUser(login, updateData)
        if (!userAccount) {
            throw new Error(`User with login ${login} not found`)
        }
        return userAccount
    }

    async changeRoles(login, role, isAddRole) {
        role = role.toUpperCase()
        let userAccount
        if (isAddRole) {
            userAccount = await userAccountRepository.addRole(login, role)
        } else {
            userAccount = await userAccountRepository.removeRole(login, role)
        }
        if (!userAccount) {
            throw new Error(`User with login ${login} not found`)
        }
        // const {roles} = userAccount
        // return {login, roles}
        // return userAccount
        const {firstName, lastName, ...userRoles} = userAccount.toObject()
        return userRoles
    }

    async changePassword(login, newPassword) {
        const userAccount = await userAccountRepository.changePassword(login, newPassword)
        if (!userAccount) {
            throw new Error(`User with login ${login} not found`)
        }
    }

    async getUser(login) {
        const userAccount = await userAccountRepository.findUser(login)
        if (!userAccount) {
            throw new Error(`User with login ${login} not found`)
        }
        return userAccount
    }
}

export default new UserAccountService();