import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPayment } from '../../../apis/payment';

export const Pays = () => {
    const { id } = useParams();
    const [pays, setPays] = useState(null);
    useEffect(() => {
        const fetchPays = async () => {
            const response = await getPayment(id);
            setPays(response);
        }
        fetchPays();
    }, [])
    return (
        <section className='container'>
            <div className="card-header bg-info text-white mt-5">
                <h3>Detalles del pago</h3>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <h5 className='text-muted'>Usuario: {pays?.usuario}</h5>
                </li>
                <li className="list-group-item">
                    <h5 className='text-muted'>Lugar: {pays?.lugar}</h5>
                </li>
                <li className="list-group-item">
                    <h5 className='text-muted'>Cantidad de personas: {pays?.personas}</h5>
                </li>
                <li className="list-group-item">
                    <h5 className='text-muted'>Metodo de pago: {pays?.metodo_pago}</h5>
                </li>
                <li className="list-group-item">
                    <h5 className='text-muted'>Total: {pays?.total_pago} Ars.</h5>
                </li>
                <li className="list-group-item">
                    <h5 className='text-muted'>Ganancia: {pays?.ganancia} Ars.</h5>
                </li>
                <li className="list-group-item">
                    <h5 className='text-muted'>Fecha del pago: {pays?.fecha_pago}</h5>
                </li>
            </ul>
        </section>
    )
}
