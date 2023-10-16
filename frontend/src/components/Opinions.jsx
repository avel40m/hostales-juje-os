import React, { useEffect, useState } from 'react'
import { getCommentsHostal } from '../apis/Comment'
import { MdStar, MdStarBorder } from 'react-icons/md'

const avatars = [
    "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    "https://i.pravatar.cc/400?img=45",
    "https://i.pravatar.cc/400?img=65"
]

export const Opinions = () => {
    const [comments, setComments] = useState([])
    useEffect(() => {
        const fetchComments = async () => {
            const response = await getCommentsHostal();
            setComments(response)
        }
        fetchComments();
    }, [])
    return (
        <section className='bg-primary'>
            <div className='container'>
                <div className="row my-5 py-5 text-dark">
                    {
                        comments.map((comment, index) => (
                            <div key={index} className="col-lg-4 d-flex justify-content-center">
                                <div className="col-md-11 col-lg-9 col-xl-7 w-100">
                                    <div className="d-flex flex-start mb-4">
                                        <img className="rounded-circle shadow-1-strong me-3"
                                            src={avatars[index]} alt="avatar" width="65"
                                            height="65" />
                                        <div className="card w-100">
                                            <div className="card-body p-4">
                                                <div className="">
                                                    <h5>{comment?.usuario}</h5>
                                                    <p>{Array.from({ length: 5 }, (_, index) => {
                                                        if (index < comment?.valoracion) {
                                                            return <MdStar color='#F0DE36' key={index} />
                                                        } else {
                                                            return <MdStarBorder key={index} />
                                                        }

                                                    })
                                                    }</p>
                                                    <p className="small">{comment?.horario}</p>
                                                    <p className='small'>{comment?.comentario}</p>
                                                    <small>{comment?.hostal}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
