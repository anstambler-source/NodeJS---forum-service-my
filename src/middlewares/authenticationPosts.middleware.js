import UserAccount from "../models/userAccount.model.js";

const authorizedPaths = [/^GET \/forum\/post\/[^/]+$/, /^GET \/forum\/posts\/author\/[^/]+$/]

const authenticationPosts = async (req, res, next) => {
    if (req.originalUrl.startsWith('/forum') && authorizedPaths.some(elem => elem.test(`${req.method} ${req.path}`))) {
        const authorization = req.headers.authorization;
        if (!authorization || !authorization.startsWith("Basic ")) {
            return res.status(401).json({message: "Authorization required"});
        }
        const base64credential = authorization.split(' ')[1]
        // const credentials = atob(base64credential)
        const credentials = Buffer.from(base64credential, 'base64').toString('ascii');
        const [login, password] = credentials.split(':');
        const userAccount = await UserAccount.findById(login);
        if (!userAccount || !(await userAccount.comparePassword(password))) {
            return res.status(401).json({message: "Invalid credentials"});
        }
        req.headers.authorization = '';
        req.principal = {userName: login, roles: userAccount.roles}
    }
    next()
}

export default authenticationPosts;


