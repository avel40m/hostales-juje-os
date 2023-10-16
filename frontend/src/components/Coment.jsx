import Cookies from 'js-cookie';
import React from 'react'
import { useForm } from 'react-hook-form'
import { createComment } from '../apis/Comment';
import toast from 'react-hot-toast';

export const Coment = ({nombre}) => {
    const {register,handleSubmit,formState: {errors},setValue} = useForm();
    const cookie = Cookies.get()
    const onSubmit = async (data) => {
        let newdata = {...data,nombre};
        const response = await createComment(cookie.token,newdata);
        if (response.status == 201) {
          setValue("comment","");
          setValue("value","");
          return toast.success("Se guardo su comentario");
        }
        toast.error("No se pudo hacer el comentario")
    }
  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Ingresar comentario</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="comment" className='form-label'>Comentario</label>
                <textarea className='form-control' id='comment' rows={'3'}
                {...register('comment',{required:"El campo es requerido"})}
                ></textarea>
                {errors && <small className='text-danger'>{errors.comment?.message}</small>}
            </div>
            <div className="mb-3">
                <label htmlFor="value" className='form-label'>Valoración</label>
                <input type="number" className='form-control' min={'1'} max={'5'} id='value' 
                {...register('value',{required:"El campo es requerido"})}
                />
                {errors && <small className='text-danger'>{errors.value?.message}</small>}
            </div>
            <div className="mb-3">
                <input type="submit" value={'Comentar'} className='btn btn-outline-primary' />
            </div>
        </form>
      </div>
    </div>
  </div>
</div>
  )
}
