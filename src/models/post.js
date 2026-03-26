import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: String, required: true},
    dateCreated: {type: String},
    tags: {type: [String], required: true},
    likes: {type: Number, default: 0},
    comments: {
        type: [{
            _id: false,
            user: {type: String, required: true},
            message: {type: String,required: true},
            dateCreated: {type: String},
            likes: {type: Number, default: 0},
        }], default: []
    }
}, {
    versionKey: false,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

const Post = mongoose.model('Post', postSchema, 'forum');

export default Post;