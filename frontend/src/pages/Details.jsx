import React, { useContext, useEffect, useState } from 'react';
import { BiBath, BiWifi } from 'react-icons/bi';
import { MdOutlineDinnerDining, MdOutlineFastfood, MdOutlineFreeBreakfast, MdOutlineLunchDining } from 'react-icons/md';
import { Navbar } from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { getHostalMenuDetails } from '../apis/Hostal';
import { UserContext } from '../App';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { generateBookings } from '../apis/bookings';
import { Loading } from '../components/Loading';

export const Details = () => {
    const { user } = useContext(UserContext);
    const [hostals, setHostals] = useState(null);
    const { id } = useParams();
    const cookie = Cookies.get();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const fetchHostal = async () => {
            const response = await getHostalMenuDetails(id);
            setHostals(response.hostals)
            setTimeout(() =>{
                setIsLoading(false)
            },2000)
        }
        fetchHostal();
    }, [])
    const onSubmit = async (data) => {
        if (data.quantity > hostals.details?.quantity) {
            return toast.error(`Cantidad de personas permitidas ${hostals.details?.quantity}`);
        }
        if (new Date(data.dateStart) < new Date()) {
            return toast.error("Fecha de llegada es incorrecto")
        }
        if (new Date(data.dateStart) > new Date(data.dateEnd)) {
            return toast.error("Fecha de salida es incorrecto")
        }
        const response = await generateBookings(cookie.token, id, data);
        if (response.status == 201) {
            toast.success(response.message);
            return
        }
        toast.error(response.message)
    }
    return (
        <>
            <Navbar />
            <section className='container'>
                {
                    isLoading ?
                    <Loading />
                    :
                <div className="row">
                <div className={user == null ? 'd-flex justify-content-center align-center' : 'col-lg-8'}>
                    <div className='card mt-5 rounded shadow'>
                        <div className="card-header bg-primary text-white fw-bold">
                            <h5>{hostals?.name}</h5>
                            <h6 className='card-subtitle mb-2'>{hostals?.place}</h6>
                            <p className='card-text'>{hostals?.description}</p>
                        </div>
                        <div className="container">
                            <div className='row text-center mt-2 mb-2'>
                                <div className='col-md-4'>
                                    <img
                                        style={{ maxWidth: '80%' }}
                                        src={`https://firebasestorage.googleapis.com/v0/b/react-firebase-crud-bbe33.appspot.com/o/${hostals?.photo}?alt=media&token=90feb06e-9c41-41ee-a206-ef584ace7063`}
                                        className="rounded mx-auto d-block" />
                                </div>
                                <div className='col'>
                                    <div className="row">
                                        <div className="col">
                                            <p>Telefono: <strong>{hostals?.phone}</strong></p>
                                            <p>Cantidad de camas: <strong>{hostals && hostals.details?.bed}</strong></p>
                                        </div>
                                        <div className="col">
                                            <p>Personas permitidas: <strong>{hostals && hostals.details?.quantity}</strong></p>
                                            <p>Precio: <strong>{hostals?.price} Ars</strong></p>
                                        </div>
                                    </div>
                                    <div className="container text-center">
                                    <div className="row">
                                    {
                                    hostals && hostals.details?.bathroom == true &&(
                                                <div className='col-6 col-lg-4 mb-3'>
                                                    <BiBath size={25} />
                                                    <small>Baño propio</small>
                                                </div>
)
                                            }
                                            {
                                                hostals && hostals.details?.wifi &&
                                                <div className='col-6 col-lg-4 mb-3'>
                                                    <BiWifi size={25} />
                                                    <small>Wifi</small>
                                                </div>

                                            }
                                            {
                                                hostals && hostals.details?.breakfast &&
                                                <div className='col-6 col-lg-4 mb-3'>
                                                    <MdOutlineFreeBreakfast size={25} />
                                                    <small>Desyuno</small>
                                                </div>

                                            }
                                            {
                                                hostals && hostals.details?.lunch &&
                                                <div className='col-6 col-lg-4 mb-3'>
                                                    <MdOutlineLunchDining size={25} />
                                                    <small>Almuerzo</small>
                                                </div>
                                            }
                                            {
                                                hostals && hostals.details?.snack &&
                                                <div className='col-6 col-lg-4 mb-3'>
                                                    <MdOutlineFastfood size={20} />
                                                    <small>Merienda</small>
                                                </div>

                                            }
                                            {
                                                hostals && hostals.details?.dinner &&
                                                <div className='col-6 col-lg-4 mb-3'>
                                                    <MdOutlineDinnerDining size={20} />
                                                    <small>Cena</small>
                                                </div>
                                            }
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4" style={user == null ? { display: 'none' } : { display: 'block' }}>
                    <form onSubmit={handleSubmit(onSubmit)}
                        className='shadow p-5 mb-5 bg-body rounded mt-5'
                    >
                        <h5 className='text-muted'>Reservar el hostal</h5>
                        <div className='form-group mt-2 mb-4'>
                            <input type="date" className='form-control' placeholder='Ingresar fecha de llegada'
                                {...register('dateStart', { required: "El campo es requerido" })}
                            />
                            {errors && <small className='text-danger'>{errors.dateStart?.message}</small>}
                        </div>
                        <div className='form-group mt-2 mb-4'>
                            <input type="date" className='form-control' placeholder='Ingresar fecha de salida'
                                {...register('dateEnd', { required: "El campo es requerido" })}
                            />
                            {errors && <small className='text-danger'>{errors.dateEnd?.message}</small>}
                        </div>
                        <div className='form-group mt-2 mb-4'>
                            <input type="text" className='form-control' placeholder='Ingresar cantidad de personas'
                                {...register('quantity', { required: "El campo es requerido" })}
                            />
                            {errors && <small className='text-danger'>{errors.quantity?.message}</small>}
                        </div>
                        <div className="form-group">
                            <input type="submit" className='btn btn-outline-success' value='Reservar hostal' />
                        </div>
                    </form>
                </div>
                </div>
                }
            </section>
        </>
    )
}
