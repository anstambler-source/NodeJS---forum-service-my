import User from "../models/user.model.js";

export function registerUser(user) {
    return User.create(user)
}


export function deleteUser (userName) {
    return User.findByIdAndDelete(userName)
}

export function updateUser (userName, data) {
    return User.findByIdAndUpdate(userName, data, { new: true })
}

export function addRole (userName, role) {
    return User.findByIdAndUpdate(userName, {$addToSet: {roles: role}}, {new: true})
}

export function deleteRole (userName, role) {
    return User.findByIdAndUpdate(userName, {$pull: {roles: role}}, {new: true})
}

export function changePassword (userName, password) {
    return User.updateOne({_id: userName}, password)
}

export function getUser (userName) {
    return User.findById(userName)
}