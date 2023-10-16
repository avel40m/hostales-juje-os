import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast';
import { postRegister } from '../../apis/user';
import { RotatingLines } from 'react-loader-spinner';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'


export const FormRegister = () => {
    const [password, setPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (datos) => {
        setIsLoading(false)
        const { status, message } = await postRegister(datos);
        setTimeout(() => {
            setIsLoading(true)
        }, 1500);
        if (status == 201) {
            toast.success(message)
            return
        }
        toast.error(message);
    }
    return (
        <form className='card mx-auto p-5 mt-5 shadow rounded' style={{ width: '400px' }} onSubmit={handleSubmit(onSubmit)}>
            <div className='form-group mb-3'>
                <label className='form-label' htmlFor="username">Usuario</label>
                <input type="text" className='form-control' placeholder='Ingrese su usuario' id='username'
                    {...register("username", { required: "El campo es requerido" })}
                />
                {errors && <small className='text-danger'>{errors.username?.message}</small>}
            </div>
            <div className='form-group mb-3'>
                <label className='form-label' htmlFor="email">Correo electronico</label>
                <input type="text" className='form-control' placeholder='Ingrese su email' id='email'
                    {...register("email", { required: "El campo es requerido", pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "Ingresar un correo electronico valido" } })}
                />
                {errors && <small className='text-danger'>{errors.email?.message}</small>}
            </div>
            <div className='form-group mb-3'>
                <label className='form-label' htmlFor="password">Contraseña</label>
                <div className='input-group mb-3'>
                    <input type={password ? 'text' : 'password'} className='form-control' placeholder='Ingrese su contraseña' id='password'
                        {...register("password", { required: "El campo es requerido", minLength: { value: 6, message: "El campo contraseña debe contar con 6 caracteres minimo" } })}
                    />
                    <span className='input-group-text' onClick={() => setPassword(!password)}>
                        {
                            password ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                        }
                    </span>
                </div>
                {errors && <small className='text-danger'>{errors.password?.message}</small>}
            </div>
            <div className="form-group">
                {
                    isLoading ?
                        <button type='submit' className='btn btn-outline-primary mb-3'>Registrarse</button>
                        :
                        <button className="btn btn-outline-primary mb-3" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                            <span role="status">Cargando...</span>
                        </button>
                }
            </div>
            <div className="d-flex justify-content-center gap-3">
                <p className='text-md-end'>Si tengo una cuenta</p>
                <Link to={'/login'} className='link-opacity-50-hover'>Iniciar sesion</Link>
            </div>
        </form>
    )
}
