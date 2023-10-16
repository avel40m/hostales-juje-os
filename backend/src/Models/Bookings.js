import mongoose from 'mongoose';

const bookingsSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    dateStart: {
        type: Date,
        required: true
    },
    dateEnd: {
        type: Date,
        required: true
    },
    hostal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostal'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    pay: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pay'
    },
},{
    timestamps: true
});

const Bookings = mongoose.model('Bookings',bookingsSchema);

export default Bookings;