import {model, Schema, Types} from "mongoose";

const userSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    roles: {
        type: [String],
        default: ['USER'],
    }
}, {
    versionKey: false,
    toJSON: {
        transform: (doc, ret) => {
            delete ret._id
            delete ret.password;
        }
    }
})

export default model('User', userSchema, 'users');