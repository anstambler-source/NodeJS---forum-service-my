class Authorization {
    hasRole(role, owner) {
        return (req, res, next) => req.principal.roles.includes(role?.toUpperCase().trim()) || owner && req.principal.userName === req.params[owner] ? next() : res.status(403).json({message: 'Access denied'});
    }
}

export default new Authorization();