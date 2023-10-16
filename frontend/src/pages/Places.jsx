import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Link, useLocation } from 'react-router-dom'
import { getHostalMenu } from '../apis/Hostal';
import { Loading } from '../components/Loading';
import { Paginations } from '../components/Paginations';
import { motion } from 'framer-motion';

export const Places = () => {
    const [places, setPlaces] = useState([])
    const location = useLocation();
    const params = new URLSearchParams(location.search).get('location');
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(3)
    useEffect(() => {
        const fetchPlaces = async () => {
            const response = await getHostalMenu();
            if (params == null) {
                return setPlaces(response);
            }
            return setPlaces(response.filter(res => res.lugar == params));
        }
        fetchPlaces();
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPost = places.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
        >
            <Navbar />
            <div className='container'>
                {
                    isLoading
                        ?
                        <Loading />
                        :
                        currentPost.map(place => (
                            <div key={place.id} className='row m-3 bg-white border rounded shadow p-4'>
                                <div className='col-lg-4'>
                                    <img
                                        className='card-img'
                                        src={`https://firebasestorage.googleapis.com/v0/b/react-firebase-crud-bbe33.appspot.com/o/${place.imagen}?alt=media&token=90feb06e-9c41-41ee-a206-ef584ace7063`}
                                        alt={place.nombre}
                                    />
                                </div>
                                <div className='col'>
                                    <h2>{place.nombre}</h2>
                                    <h4>{place.lugar}</h4>
                                    <p className='text-muted'>{place.descripcion}</p>
                                    <p>Precio: {place.precio} Ars.</p>
                                    <p>Telefono: {place.telefono}</p>
                                    <div className='row'>
                                        <div className="col">
                                            <Link
                                                to={`https://www.google.com/maps/dir/${place.ubicacion}`}
                                                className='btn btn-outline-success btn-sm'
                                                target='_blank'
                                            >Como llegar</Link>
                                        </div>
                                        <div className="col">
                                            <Link to={`/detalles/${place.id}`}>
                                                Detalles
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                }
                {
                    !isLoading &&
                    <Paginations
                        postsPerPage={postsPerPage - 1}
                        totalPosts={places.length}
                        paginate={paginate}
                    />
                }
            </div>
        </motion.div>
    )
}
