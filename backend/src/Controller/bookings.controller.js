import Bookings from "../Models/Bookings.js";
import Hostal from "../Models/Hostal.js";
import User from "../Models/User.js";
import { MyBookings, getBookingsDTO } from "../dto/bookings.dto.js";
import { PaysDTO } from "../dto/pays.dto.js";

export const createBookings = async (req,res) => {
    const {quantity,dateStart,dateEnd} = req.body;
    const {idHostal} = await req.params;
    const id = req.idUser;
    try {
        const usuario = await User.findById(id);
        if(!usuario)
            return res.status(404).json({status: 404,message:'Usuario no encontrado'});
        const hostal = await Hostal.findById(idHostal);
        if(!hostal)
            return res.status(404).json({status: 404,message:'Hostal no encontrado'});
        const bookings = new Bookings();
        bookings.quantity = quantity;
        bookings.dateStart = new Date(dateStart);
        bookings.dateEnd = new Date(dateEnd);
        bookings.price = hostal.price * quantity;
        bookings.user = usuario;
        bookings.hostal = hostal;

        await bookings.save();
        return res.status(201).json({status: 201,message:"Hostal reservado correctamente!!!"})
    } catch (error) {
        return res.status(500).json({status: 500,message:error});
    }
}

export const myBookings = async (req,res) => {
    const id = req.idUser;
    try {
        const bookings = await Bookings.find({user: id}).populate(['hostal','pay']);
        const arregloBookings = [];
        bookings.map(booking => {
            let bookingDTO = new MyBookings(booking.id,
                booking.quantity,
                formatoDeFecha(booking.dateStart),
                formatoDeFecha(booking.dateEnd),
                booking.price,
                booking.hostal.name,
                booking.hostal.place,
                booking.hostal.photo,
                booking.hostal.phone,
                booking.hostal.address,
                booking.pay != null ? true : false,
                booking.hostal.name.split(' ').join('+')
                );
            arregloBookings.push(bookingDTO);
        })
        return res.status(200).json({reservas: arregloBookings});
    } catch (error) {
        return res.status(500).json({messaje:error});
    }
}

export const getBookings = async (req,res) => {
    try {
        const bookings = await Bookings.find().populate('hostal');
        const arregloBookings = [];
        bookings.forEach(booking => {
            let bookingDTO = new getBookingsDTO();
            bookingDTO.id = booking.id;
            bookingDTO.lugar = booking.hostal?.name;
            bookingDTO.personas = booking.quantity;
            bookingDTO.precio = booking.price;
            bookingDTO.checkin = formatoDeFecha(booking.dateStart);
            bookingDTO.checkout = formatoDeFecha(booking.dateEnd);
            bookingDTO.pago = booking.pay ? true : false
            arregloBookings.push(bookingDTO);
        })
        return res.status(200).json(arregloBookings);
    } catch (error) {
        return res.status(500).json({message:error});
    }
}

const formatoDeFecha = (fecha) => {
    return new Intl.DateTimeFormat('es',{dateStyle:'full'}).format(fecha);
}

export const getBookingsPays = async (req,res) => {
    const {id} = req.params;
    try {
        const booking = await Bookings.findById(id).populate(['user','hostal','pay']);
        const payDTO = new PaysDTO();
        payDTO.estado = booking.pay?.status;
        payDTO.fecha_pago = formatoDeFecha(booking.pay?.createdAt);
        payDTO.ganancia = booking.pay?.revenue;
        payDTO.id = booking.id
        payDTO.lugar = booking.hostal?.place;
        payDTO.metodo_pago = booking.pay?.type;
        payDTO.personas = booking.quantity;
        payDTO.precio = booking.hostal?.price;
        payDTO.tarjeta = booking.pay?.tarjet;
        payDTO.total_pago = booking.pay?.total;
        payDTO.usuario = booking.user?.username;
        return res.status(200).json(payDTO);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error})
    }
}