import Cookies from 'js-cookie';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { postLogin } from '../../apis/user';

export const FormLogin = () => {
    const [password, setPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const onSubmit = async (datos) => {
        setIsLoading(false)
        const { status, message, data } = await postLogin(datos);
        setTimeout(() => {
            setIsLoading(true)
        }, 1500);
        if (status == 200) {
            toast.success("Usuario loggeado correctamente!!!");
            Cookies.set('token', data.token, { expires: new Date().getTime() + (30 * 60 * 1000) });
            setUser(data.userdto);
            if (data.userdto.rol == 'ADMIN') {
                navigate('/dashboard');
                return
            }
            navigate('/');
            return
        }
        toast.error(message);
    }
    return (
        <form className='card mx-auto p-5 mt-5 shadow rounded' style={{ width: '400px' }} onSubmit={handleSubmit(onSubmit)}>
            <div className='form-group mb-3'>
                <label htmlFor="username" className='form-label'>Usuario o Email</label>
                <input type="text" className='form-control' placeholder='Ingrese su usuario o email' id='username'
                    {...register("username", { required: "El campo es requerido" })}
                />
                {errors && <small className='text-danger'>{errors.username?.message}</small>}
            </div>
            <div className='form-group mb-3'>
                <label htmlFor="password" className='form-label'>Contraseña</label>
                <div className='input-group mb-3'>
                    <input type={password ? 'text' : 'password'} className='form-control' placeholder='Ingrese su contraseña' id='password'
                        {...register("password", { required: "El campo es requerido" })}
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
                        <button type='submit' className='btn btn-outline-primary mb-3'>Ingresar</button>
                        :
                        <button className="btn btn-outline-primary mb-3" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                            <span role="status">Cargando...</span>
                        </button>
                }
            </div>
            <div className="d-flex justify-content-center gap-3">
                <p className='text-md-end'> No tengo una cuenta</p>
                <Link to={'/register'} className='link-opacity-50-hover'>Registrarme</Link>
            </div>
        </form>
    )
}
