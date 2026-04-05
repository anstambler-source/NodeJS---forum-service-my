import * as repoUser from '../repositories/user.repository.js'
import {AppError} from "../errors/AppError.js";

export async function registerUser (user) {
    try{
        return await repoUser.registerUser({...user, _id: user.login.toLowerCase()})
    }catch(e){
        if (e.errorResponse.code === 11000)
            throw new AppError(`User ${user.login} already exists`, 409)
        throw new AppError(e.message)
    }
}



export async function deleteUser (userName) {
    return repoUser.deleteUser(userName.toLowerCase())
}

export async function updateUser (userName, userData) {
    return repoUser.updateUser(userName.toLowerCase(), userData)
}

export async function addRole (userName, role) {
    return repoUser.addRole(userName.toLowerCase(), role.toUpperCase())
}

export async function deleteRole (userName, role) {
    return repoUser.deleteRole(userName.toLowerCase(), role.toUpperCase())
}

export async function changePassword (userName, password) {
    return repoUser.changePassword(userName, password)
}

export async function getUser (userName) {
    return repoUser.getUser(userName.toLowerCase())
}