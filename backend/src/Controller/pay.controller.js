import mercadopago from 'mercadopago';
import Pay from '../Models/Pay.js';
import Bookings from '../Models/Bookings.js';
import dotenv from 'dotenv'

dotenv.config();

export const createOrder = async (req, res) => {
    const {nombre,precio,id} = req.body;
    mercadopago.configure({
        access_token: process.env.ACCESS_TOKEN_MERCADOPAGO
    });

    const result = await mercadopago.preferences.create({
        items: [{
            title: nombre,
            unit_price: precio,
            currency_id: 'ARS',
            quantity: 1
        }],
        back_urls: {
            success: 'http://localhost:4000/api/success',
            failure: 'http://localhost:4000/api/failure',
            pending: 'http://localhost:4000/api/pending'
        },
        notification_url: `${process.env.KEY_NGROK}/api/webhook?data.booking=${id}`
    });

    res.status(200).json(result);
}

export const receiveWebhook = async (req,res) => {
    const payment = req.query;
    try {
        if (payment.type === 'payment') {
            const data = await mercadopago.payment.findById(payment['data.id']);
            const pay = new Pay();
            pay.transaction_id = data.body.id;
            pay.description = data.body.description;
            pay.type = data.body.order.type;
            pay.tarjet = data.body.payment_method_id;
            pay.status = data.body.status;
            pay.total = data.body.transaction_details.total_paid_amount;
            pay.revenue = data.body.transaction_details.net_received_amount;
            
            await pay.save();
            let idBooking = payment["data.booking"];
            let booking = await Bookings.findById(idBooking);
            booking.pay = pay;
            booking.save();
        }
        return res.sendStatus(204);
    } catch (error) {
        return res.sendStatus(500).json({message:error});
    }
}

export const success = (req,res) => {
    res.redirect('http://127.0.0.1:5173/')
}