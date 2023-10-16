import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    sector: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Profile = mongoose.model('Profile',profileSchema);

export default Profile;