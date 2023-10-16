import mongoose from 'mongoose';

const paySchema = new mongoose.Schema({
    transaction_id:{
        type:Number
    },
    description:{
        type:String
    },
    type:{
        type:String
    },
    tarjet:{
        type:String
    },
    status:{
        type:String
    },
    total: {
        type: Number,
    },
    revenue: {
        type: Number,
    }
},{
    timestamps: true
});

const Pay = mongoose.model('Pay',paySchema);

export default Pay;