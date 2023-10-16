import { useEffect, useState } from 'react';
import './styles/cards.css';
import { getHostalMenu } from '../apis/Hostal';
import { Link } from 'react-router-dom';
import { Loading } from './Loading';

export const Cards = () => {
    const [hostals, setHostals] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const fetchHostal = async () => {
            const response = await getHostalMenu();
            setHostals(response.slice(0,4));
            setTimeout(() => {
                setIsLoading(false)
            },2000)
        }
        fetchHostal();
    }, [])
    return (
        <section className='container text-center align-center'>
            <div className="row">
                {
                    isLoading  
                    ?
                    <Loading />
                    :
                    hostals?.map(hostal => (
                        <div className="col-md-6 mb-4" key={hostal.id}>
                            <Link to={`/detalles/${hostal.id}`}
                                key={hostal.id}
                                className='card bg-black text-white'
                                >
                                <img className='card-img'
                                    src={`https://firebasestorage.googleapis.com/v0/b/react-firebase-crud-bbe33.appspot.com/o/${hostal.imagen}?alt=media&token=90feb06e-9c41-41ee-a206-ef584ace7063`}
                                    style={{width:'100%',height:'300px'}}
                                    alt="bootstrap" />
                                <div className='overlay-image'></div>
                                <div className='card-img-overlay'>
                                    <h5 className='card-title'>{hostal.nombre}</h5>
                                    <p className='card-text'>{hostal.descripcion}</p>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}
