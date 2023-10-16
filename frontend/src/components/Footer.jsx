import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { sendMessage } from '../apis/SendMessage';
import toast from 'react-hot-toast';

export const Footer = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [isLoading, setIsLoading] = useState(true)
    const onSubmit = async (data) => {
        setIsLoading(false)
        const response = await sendMessage(data);
        if (response.status == 200) {
            setValue('email', '');
            setValue('name', '');
            setValue('subject', '');
            setValue('message', '');
            setIsLoading(true)
            return toast.success("Mensaje enviado correctamente");

        }
        toast.error('Error a enviar el mensaje')
        console.log(response);
    }
    return (
        <>
            <footer className='container text-center p-5'>
                <div className='row'>
                    <div className='col-lg-6'>
                        <h4>Contactenos</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia commodi esse optio inventore cum corporis corrupti quasi a temporibus illum!</p>
                    </div>
                    <div className='col'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="email" placeholder="name@example.com"
                                    {...register("email", { required: "El campo es requerido" })}
                                />
                                <label htmlFor="email">Correo electronico</label>
                                {errors && <small className='text-danger'>{errors.email?.message}</small>}
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="name" placeholder="Ingrese su nombre"
                                    {...register("name", { required: "El campo es requerido" })}
                                />
                                <label htmlFor="name">Nombre</label>
                                {errors && <small className='text-danger'>{errors.name?.message}</small>}
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="subject" placeholder="No puedo encontrar hostal"
                                    {...register("subject", { required: "El campo es requerido" })}
                                />
                                <label htmlFor="subject">Consulta</label>
                                {errors && <small className='text-danger'>{errors.subject?.message}</small>}
                            </div>
                            <div className="form-floating mb-3">
                                <textarea type="text" className="form-control" id="message" placeholder="Ingresar mensaje"
                                    {...register("message", { required: "El campo es requerido" })}
                                ></textarea>
                                <label htmlFor="message">Mensaje</label>
                                {errors && <small className='text-danger'>{errors.message?.message}</small>}
                            </div>
                            <div className='form-group'>
                                {
                                    isLoading ?
                                        <input type="submit" value={'Enviar consulta'} className='btn btn-primary' />
                                        :
                                        <button className="btn btn-primary" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                            <span role="status">Enviando...</span>
                                        </button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </footer>
            <div className="text-center text-white p-4 bg-dark">
                © 2023 Copyright: <b>Mendez Hector Avelino</b>
            </div>
        </>
    )
}
