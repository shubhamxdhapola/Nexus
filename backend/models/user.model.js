import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    provider: {
        type: String,
        required: true,
        enum: ['local', 'google'],
        default: 'local'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: function () {
            return this.provider == 'local'
        },
    },
    profilePic: {
        type: String,
        default: null,
    },
    firebaseUID: {
        type: String,
    },
    bio : {
        type : String,
    }
}, { timeStamps: true })

userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) return next();
        this.password = await bcrypt.hash(this.password, 10)
    } catch (err) {
        console.log("Error in password hashing : ", err);
        next()
    }
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)
export default User