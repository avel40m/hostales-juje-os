import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getMyBookings } from '../../apis/bookings';
import { postPayment } from '../../apis/payment';
import { Link } from 'react-router-dom';
import { Coment } from '../../components/Coment';
import { motion } from 'framer-motion';

export const Bookings = () => {
    const cookie = Cookies.get();
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        const fetchBookings = async () => {
            const response = await getMyBookings(cookie.token);
            setBookings(response.reservas);
        }
        fetchBookings();
    }, [])
    const realizarPago = async (nombre, precio, id) => {
        if (nombre == undefined || precio == undefined || id == undefined)
            return toast.error('Hubo un error en el pago')
        const response = await postPayment(nombre, precio, id);
        if (response.status == 201)
            return window.location.href = response.response.init_point

        toast.error('Error al realizar el pago');
        console.log(response);
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}>
            <section className='container mt-3'>
                {
                    bookings.length == 0
                        ?
                        <div className='text-center'>
                            <h1>No tiene reservas</h1>
                        </div>
                        :
                        bookings.map(booking => (
                            <div key={booking.id} className="row p-5 bg-white border mt-4 mb-4 rounded shadow">
                                <div className="col-lg-4">
                                    <img
                                        className='img-thumbnail'
                                        src={`https://firebasestorage.googleapis.com/v0/b/react-firebase-crud-bbe33.appspot.com/o/${booking?.imagen}?alt=media&token=90feb06e-9c41-41ee-a206-ef584ace7063`}
                                        alt="" />
                                </div>
                                <div className="col">
                                    <ul className="list-group mt-3">
                                        <li className="list-group-item">
                                            Nombre: <strong>{booking?.nombre}</strong>
                                        </li>
                                        <li className="list-group-item">
                                            Lugar: <strong>{booking?.lugar}</strong>
                                        </li>
                                        <li className="list-group-item">
                                            Precio: <strong>{booking?.precio} Ars.</strong>
                                        </li>
                                        <li className="list-group-item">
                                            Cantidad de personas: <strong>{booking?.cantidad}</strong>
                                        </li>
                                        <li className="list-group-item">
                                            Telefono: <strong>{booking?.telefono}</strong>
                                        </li>
                                        <li className="list-group-item">
                                            Fecha de llegada: <small><strong>{booking?.fecha_llegada}</strong></small>
                                        </li>
                                        <li className="list-group-item">
                                            Fecha de salida: <small><strong>{booking?.fecha_salida}</strong></small>
                                        </li>
                                    </ul>
                                    <div className="container text-center">
                                        <div className='row'>
                                            <div className="col-md-6 p-3">
                                                <Link
                                                    to={`https://www.google.com/maps/dir/${booking.ubicacion}`}
                                                    className='btn btn-outline-success btn-sm'
                                                    target='_blank'
                                                >Como llegar</Link>
                                            </div>
                                            <div className="col-md-6 p-3">
                                                <button type="button" className="btn btn-outline-success btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                    Comentario
                                                </button>
                                                <Coment nombre={booking?.nombre} />
                                            </div>
                                            <div className="col-md-6 p-3">
                                                {
                                                    booking.pay
                                                        ?
                                                        <p className='fw-bold text-muted'>Pagado</p>
                                                        :
                                                        <button
                                                            className='btn btn-outline-primary btn-sm'
                                                            onClick={() => realizarPago(booking.nombre, booking.precio, booking.id)}
                                                        >
                                                            Pagar
                                                        </button>

                                                }
                                            </div>
                                            <div className="col-md-6 p-3">
                                                <button
                                                    className='btn btn-outline-danger btn-sm'
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                }
            </section>
        </motion.div>
    )
}
