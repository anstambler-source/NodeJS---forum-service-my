import express from 'express';
import mongoose from "mongoose";
import config from "./configuration/config.js";
import postRoutes from "./routes/post.routes.js";
import userRoutes from "./routes/user.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use('/account', userRoutes);
app.use('/forum', postRoutes)

app.use(errorHandler)

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongodb.uri, config.mongodb.db)
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