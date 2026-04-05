import User from '../models/user.model.js'

const basicAuth = async (req, res, next) => {
    const header = req.headers.authorization

    if (!header || !header.startsWith('Basic ')) {
        return res.status(401).json({ message: 'No auth header' });
    }

    const base64 = header.split(' ')[1]
    const decoded = Buffer.from(base64, 'base64').toString();
    const [userName, password] = decoded.split(':')

    const user = await User.findById(req.params.user ? req.params.user.toLowerCase() : userName.toLowerCase())
    if (!user || user._id !== userName.toLowerCase() || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    req.user = user
    next()
}

export default basicAuth;