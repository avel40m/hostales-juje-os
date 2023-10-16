import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { editProfile, getProfile } from '../../apis/profile';
import { motion } from 'framer-motion'

export const EditProfile = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const cookie = Cookies.get();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProfile = async () => {
            let response = await getProfile(cookie.token);
            let datos = response.data;
            setValue("phone", datos?.phone)
            setValue("province", datos?.province)
            setValue("location", datos?.location)
            setValue("city", datos?.city)
            setValue("sector", datos?.sector)
        }
        fetchProfile();
    }, [])

    const onSubmit = async (data) => {
        const response = await editProfile(cookie.token, data);
        if (response.status == 204) {
            toast.success('Perfil editado correctamente!!!')
            return navigate('/profile');
        }
        toast.error(response.error.message)
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
        >
            <form className='container' onSubmit={handleSubmit(onSubmit)}>
                <h5>Editar mi perfil</h5>
                <div className='form-group mt-4 mb-4'>
                    <label htmlFor="phone" className='form-label'>Telefono</label>
                    <input type="text" className='form-control' id='phone' placeholder='Ingrese el número telefonico'
                        {...register('phone', { required: "El campo telefono es obligatorio" })}
                    />
                    {errors && <small className='text-danger'>{errors.phone?.message}</small>}
                </div>
                <div className='form-group'>
                    <label htmlFor="province" className='form-label'>Provincia</label>
                    <input type="text" className='form-control' id='province' placeholder='Ingrese su provincia'
                        {...register('province', { required: "El campo provincia es obligatorio" })}
                    />
                    {errors && <small className='text-danger'>{errors.province?.message}</small>}
                </div>
                <div className='form-group'>
                    <label htmlFor="location" className='form-label'>Lugar</label>
                    <input type="text" className='form-control' id='location' placeholder='Ingrese su lugar'
                        {...register('location', { required: "El campo lugar es obligatorio" })}
                    />
                    {errors && <small className='text-danger'>{errors.location?.message}</small>}
                </div>
                <div className='form-group'>
                    <label htmlFor="city" className='form-label'>Ciudad</label>
                    <input type="text" className='form-control' id='city' placeholder='Ingrese su ciudad'
                        {...register('city', { required: "El campo ciudad es obligatorio" })}
                    />
                    {errors && <small className='text-danger'>{errors.city?.message}</small>}
                </div>
                <div className='form-group'>
                    <label htmlFor="sector" className='form-label'>Barrio</label>
                    <input type="text" className='form-control' id='sector' placeholder='Ingrese su barrio'
                        {...register('sector', { required: "El campo barrio es obligatorio" })}
                    />
                    {errors && <small className='text-danger'>{errors.sector?.message}</small>}
                </div>
                <div className="form-group">
                    <input type="submit" value='Editar Perfil' className='btn btn-outline-success' />
                </div>
            </form>
        </motion.div>
    )
}
