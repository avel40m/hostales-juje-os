import mongoose from 'mongoose';

const detailsSchema = new mongoose.Schema({
    bed: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    bathroom: {
        type: Boolean,
        required: true
    },
    wifi: {
        type: Boolean,
        required: true
    },
    breakfast: {
        type: Boolean,
        required: true,
    },
    lunch: {
        type: Boolean,
        required: true,
    },
    snack: {
        type: Boolean,
        required: true,
    },
    dinner: {
        type: Boolean,
        required: true,
    }
},{
    timestamps: true
});

const Details = mongoose.model('Details',detailsSchema);

export default Details;