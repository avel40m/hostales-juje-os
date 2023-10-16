import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { createDetailsHostal } from '../../../apis/Details';
import toast from 'react-hot-toast';

export const DetailsAddHostal = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {id} = useParams();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const resp = await createDetailsHostal(id,data);
    if (resp.status == 201) {
      toast.success('El dtalle fue agregado correctamente!!!');
      navigate('/dashboard');
      return
    }
    toast.error(resp.error)
  }
  return (
    <main className='container'>
      <div>
        <h5>Detalles del hostal</h5>
        <p>Esté formulario permitirá agregarle más datos al hostal</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row m-5'>
          <div className='col'>
            <label htmlFor="bed" className='form-label'>Camas</label>
            <input type="text" className='form-control' placeholder='Ingresar la cantidad de camas'
              {...register('bed', { required: "El campo cama es requerido" })}
            />
            {errors && <small className='text-danger'>{errors.bed?.message}</small>}
          </div>
          <div className='col'>
            <label htmlFor="quantity" className='form-label'>Personas</label>
            <input type="text" className='form-control' placeholder='Ingresar la cantidad de personas en la pieza'
              {...register('quantity', { required: "El campo cama es requerido" })}
            />
            {errors && <small className='text-danger'>{errors.quantity?.message}</small>}
          </div>
        </div>
        <div className="row m-5">
          <div className='col'>
            <label htmlFor="bathroom" className='form-label'>Baño</label>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="bathroom1" value="true"
                {...register('bathroom', { required: "Elije una opción" })}
              />
              <label className="form-check-label" for="bathroom1">Tiene Baño propio</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="bathroom2" value="false"
                {...register('bathroom', { required: "Elije una opción" })}
              />
              <label className="form-check-label" for="bathroom2">Tiene Baño compartido</label>
            </div>
            <br />
            {errors && <small className='text-danger'>{errors.bathroom?.message}</small>}
          </div>
          <div className='col'>
            <label htmlFor="wifi" className='form-label'>Wi-Fi</label>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="wifi1" value="true"
                {...register('wifi', { required: "Elije una opción" })}
              />
              <label className="form-check-label" for="wifi1">Cuenta con wi-fi</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="wifi2" value="false"
                {...register('wifi', { required: "Elije una opción" })}
              />
              <label className="form-check-label" for="wifi2">No tiene wi-fi</label>
            </div>
            <br />
            {errors && <small className='text-danger'>{errors.wifi?.message}</small>}
          </div>
        </div>
        <div className="row m-5">
          <div className='col'>
            <label htmlFor="breakfast" className='form-label'>Desayuno</label>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="breakfast1" value="true"
                {...register('breakfast', { required: "Elije una opción" })}
              />
              <label className="form-check-label" for="breakfast1">Desayuno incluido</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="breakfast2" value="false"
                {...register('breakfast', { required: "Elije una opción" })}
              />
              <label className="form-check-label" for="breakfast2">No cuenta con desayuno</label>
            </div>
            <br />
            {errors && <small className='text-danger'>{errors.breakfast?.message}</small>}
          </div>
          <div className='col'>
            <label htmlFor="lunch" className='form-label'>Almuerzo</label>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="lunch1" value="true"
                {...register('lunch', { required: "Elije una opción" })}
              />
              <label className="form-check-label" for="lunch1">Almuerzo incluido</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="lunch2" value="false"
                {...register('lunch', { required: "Elije una opción" })}
              />
              <label className="form-check-label" for="lunch2">No cuenta con almuerzo</label>
            </div>
          <br />
          {errors && <small className='text-danger'>{errors.lunch?.message}</small>}
          </div>
        </div>
        <div className="row m-5">
          <div className='col'>
            <label htmlFor="snack" className='form-label'>Merienda</label>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="snack1" value="true"
                {...register('snack', { required: "Elije una opción" })}
              />
              <label className="form-check-label" for="snack1">Merienda incluido</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="snack2" value="false"
                {...register('snack', { required: "Elije una opción" })}
              />
              <label className="form-check-label" for="snack2">No cuenta con merienda</label>
            </div>
          <br />
          {errors && <small className='text-danger'>{errors.snack?.message}</small>}
          </div>
          <div className='col'>
            <label htmlFor="launch" className='form-label'>Cena</label>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="dinner1" value="true"
                {...register('dinner', { required: "Elije una opción" })}
              />
              <label className="form-check-label" for="dinner1">Cena incluida</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="dinner2" value="false"
                {...register('dinner', { required: "Elije una opción" })}
              />
              <label className="form-check-label" for="dinner2">No cuenta con cena</label>
            </div>
          <br />
          {errors && <small className='text-danger'>{errors.dinner?.message}</small>}
          </div>
        </div>
        <div className="form-group">
          <input type="submit" value='Guardar detalles del hostal' className='btn btn-outline-success' />
        </div>
      </form>
    </main>
  )
}
