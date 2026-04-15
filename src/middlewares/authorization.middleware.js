class Authorization {
    // hasRole(role) {
    //     return (req, res, next) => req.principal.roles.includes(role.toUpperCase().trim()) ? next() : res.status(403).json({message: 'Access denied'});
    // }
    hasRole(role, owner) {
        return (req, res, next) => req.principal.roles.includes(role?.toUpperCase().trim()) || owner && req.principal.userName === req.params.login ? next() : res.status(403).json({message: 'Access denied'});
    }
}

export default new Authorization();