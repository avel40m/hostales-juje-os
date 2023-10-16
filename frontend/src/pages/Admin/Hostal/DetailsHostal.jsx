import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { detailsHostal } from '../../../apis/Hostal';

export const DetailsHostal = () => {
    const {id} = useParams();
    const [hostal, setHostal] = useState([])
    useEffect(() => {
        const fetchDetails = async () => {
            const res = await detailsHostal(id);
            setHostal(res);
        }
        fetchDetails();
    },[])
    return (
        <main className='container  d-flex justify-content-center mt-5'>
            <div className='card' style={{maxWidth:'50rem'}}>
                <div className="card-header">
                    <img src={`https://firebasestorage.googleapis.com/v0/b/react-firebase-crud-bbe33.appspot.com/o/${hostal?.photo}?alt=media&token=90feb06e-9c41-41ee-a206-ef584ace7063`} className="img-fluid" />
                </div>
                <div className="card-body">
                    <div className='d-flex justify-content-between'>
                        <p>Lugar: <strong>{hostal?.place}</strong></p>
                        <p>Nombre: <strong>{hostal?.name}</strong></p>
                        <p>Precio: <strong>Ars. {hostal?.price}</strong></p>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <p>Telefono <strong>{hostal?.phone}</strong></p>
                        <p>Creado <strong>{hostal?.createdAt}</strong></p>
                        {/* <Link to={`https://www.google.com/maps/place/San+Salvador+de+Jujuy,+Jujuy/@${hostal?.latitude},${hostal?.longitude}/data=!3m1!4b1!4m6!3m5!1s0x941b0f4e8bd7a62f:0x315150e057f6e499!8m2!3d-24.1857864!4d-65.2994767!16zL20vMDJ0Ymhk?entry=ttu`}
                        target='_blank'>
                            Ir al lugar
                        </Link> */}
                    </div>
                </div>
                <div className="card-footer">
                    <div className='d-flex justify-content-between'>
                        <Link to={`/add-details/${hostal?._id}`}>Agregar más detalles</Link>
                        <p>Eliminar</p>
                        <p>Ver reservas</p>
                    </div>
                </div>
            </div>
        </main>
    )
}
