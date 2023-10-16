import mongoose from 'mongoose';

const hostalSchema = new mongoose.Schema({
    place: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        max: 255
    },
    address: {
        required: true,
        type: String
    }
    ,
    price: {
        type: String,
        required: true
    },
    phone: {
        type:String,
        required: true,
        unique:true
    },
    photo: {
        type: String,
        required: true
    }, 
    details: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Details'
    },
    pay: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pay'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},{
    timestamps: true
});

const Hostal = mongoose.model('Hostal',hostalSchema);

export default Hostal;