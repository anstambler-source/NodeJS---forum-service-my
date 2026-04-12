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

userAccountSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
})

// userAccountSchema.pre('findOneAndUpdate', async function () {
//     const update = this.getUpdate();
//
//     if (update.$set?.password) {
//         update.$set.password = await bcrypt.hash(update.$set.password, 12);
//     }
// });


export default model('UserAccount', userAccountSchema, 'users');