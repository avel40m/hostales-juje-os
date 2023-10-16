import React, { useState } from 'react'

export const Paginations = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i < Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav aria-label="Page navigation example">
            <ul className='pagination justify-content-center'>
                {
                    pageNumbers.map(number => (
                        <li key={number} className='page-item'>
                            <a onClick={() => paginate(number)} className='page-link' style={{cursor:'pointer'}}>
                                {number}
                            </a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}
