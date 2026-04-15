import express, {Router} from 'express';
import mongoose from "mongoose";
import config from "./configuration/config.js";
import postRoutes from "./routes/post.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import userAccountRoutes from "./routes/userAccount.routes.js";
import authentication from "./middlewares/authentication.middleware.js";
import {createAdmin} from "./configuration/initAdmin.js";
import authorization from "./middlewares/authorization.middleware.js";
import {ADMIN, OWNER} from "./configuration/constants.js";
import authenticationPosts from "./middlewares/authenticationPosts.middleware.js";

const app = express();
const authorizationRouter = Router()

app.use(express.json());
app.use(authentication)
// app.use(authenticationPosts)
// authorizationRouter.patch('/account/user/:login/role/:role', authorization.hasRole(ADMIN));
// authorizationRouter.delete('/account/user/:login/role/:role', authorization.hasRole(ADMIN));
authorizationRouter.all('/account/user/:login/role/:role', authorization.hasRole(ADMIN))
authorizationRouter.delete('/account/user/:login', authorization.hasRole(ADMIN, OWNER))
authorizationRouter.patch('/account/user/:login', authorization.hasRole(null, OWNER))

app.use(authorizationRouter);
app.use('/forum', postRoutes)
app.use('/account', userAccountRoutes)

app.use(errorHandler)

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongodb.uri, config.mongodb.db)
        await createAdmin();
        console.log("Connected to MongoDB");
    } catch (e) {
        console.log('Failed connecting to MongoDB: ', e);
    }
}

async function startServer() {
    await connectDB();
    app.listen(config.port, () => console.log(`Server running on port ${config.port}. Press Ctrl+C to quit.`));
}

startServer();