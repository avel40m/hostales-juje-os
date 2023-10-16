import React, { useState } from 'react'
import {useForm} from 'react-hook-form';
import toast from 'react-hot-toast';
import { uploadFile } from '../../../firebase/config';
import { createHostal } from '../../../apis/Hostal';
import { useNavigate } from 'react-router-dom';

export const FormAddHostal = () => {
    const {register,handleSubmit,formState: {errors}} = useForm();
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        if (file === null) {
            toast.error('No selecciono ninguna imagen');
        }
        const response = await uploadFile(file);
        const datos = {...data,photo: response.metadata.fullPath};
        const resp = await createHostal(datos);
        if (resp.status == 201) {
            toast.success("Hostal creado correctamente");
            navigate('/dashboard')
            return
        }
        toast.error(resp.message);
    }
    return (
        <main className='container mt-5'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row mb-4'>
                    <div className='col'>
                        <div className='form-group'>
                            <label htmlFor="place" className='form-label'>Lugar</label>
                            <input type="text" id='place' className='form-control' placeholder='Ingrese el lugar' 
                            {...register('place',{required: "El campo lugar es requerido"})}
                            />
                            {errors && <small className='text-danger'>{errors.place?.message}</small>}
                        </div>
                    </div>
                    <div className="col">
                        <div className='form-group'>
                            <label htmlFor="name" className='form-label'>Nombre</label>
                            <input type="text" id='name' className='form-control' placeholder='Ingrese el nombre del hostal' 
                            {...register('name',{required:"El campo nombre es requerido"})}
                            />
                            {errors && <small className='text-danger'>{errors.name?.message}</small>}
                        </div>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <div className='form-group'>
                            <label htmlFor="address" className='form-label'>Direccion</label>
                            <input type="text" id='address' className='form-control' placeholder='Ingrese la direccion del hostal'
                            {...register('address',{required:'El campo direccion es requerido'})}
                            />
                            {errors && <small className='text-danger'>{errors.address?.message}</small>}
                        </div>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <div className='form-group'>
                            <label htmlFor="price" className='form-label'>Precio</label>
                            <input type="text" id='price' className='form-control' placeholder='Ingrese el precio del hostal'
                            {...register('price',{required:"El campo precio es requerido"})}
                            />
                            {errors && <small className='text-danger'>{errors.price?.message}</small>}
                        </div>
                    </div>
                    <div className="col">
                        <div className='form-group'>
                            <label htmlFor="phone" className='form-label'>Telefono</label>
                            <input type="text" id='phone' className='form-control' placeholder='Ingrese el telefono del hostal' 
                            {...register('phone',{required:"El campo telefono es requerido"})}
                            />
                            {errors && <small className='text-danger'>{errors.phone?.message}</small>}
                        </div>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="description">Descripcion</label>
                            <textarea className="form-control" placeholder="Ingresar una descripcion del hostal" id="description"
                            {...register('description',{required:"El campo descripcion es requerido"})}
                            ></textarea>
                            {errors && <small className='text-danger'>{errors.description?.message}</small>}
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="imagen" className="form-label">Selecionar imagen</label>
                            <input className="form-control" onChange={e => setFile(e.target.files[0])} type="file" id="imagen" />
                        </div>
                    </div>
                </div>
                <div className='text-center'>
                    <input type="submit" value='Guardar Hostal' className='btn btn-outline-success' />
                </div>
            </form>
        </main>
    )
}
