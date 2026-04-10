import {Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';

const userAccountSchema = new Schema({
    _id: {
        type: String,
        required: true,
        alias: 'login'
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    roles: {
        type: [String],
        default: ['USER']
    }
}, {
    versionKey: false,
    toJSON: {
        transform: (doc, ret, options) => {
            ret.login = doc._id
            delete ret.password;
            delete ret._id
            if (options?.hidePersonal) {
                delete ret.firstName;
                delete ret.lastName;
            }
        }
    },
    toObject: {
        transform: (doc, ret) => {
            ret.login = doc._id
            delete ret.password;
            delete ret._id
        }
    }
});

userAccountSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
    }
})


export default model('UserAccount', userAccountSchema, 'users');