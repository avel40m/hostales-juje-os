import mongoose from 'mongoose';

const rolEnum = ['CLIENT', 'ADMIN']

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        max: 20,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 20,
        min: 6
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    rol: {
        type: String,
        enum: rolEnum,
        default: rolEnum[0]
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;