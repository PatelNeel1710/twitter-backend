import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { HASH_NUMBER } from '../config/config';

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Email must be valid'],
            required: true
        },
        password: {
            type: String,
            require: [true, 'Please pass password']
        },
        followers: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
            default: [],
        },
        following: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    if (this.password) {
        this.password = await bcrypt.hash(this.password, HASH_NUMBER);
    }

    next();
});

userSchema.methods.correctPassword = async function (candidatePassword: string, userPassword: string) {
    const isCorrect = await bcrypt.compare(candidatePassword, userPassword);
    return isCorrect;
};

const User = mongoose.model('user', userSchema);

export default User;