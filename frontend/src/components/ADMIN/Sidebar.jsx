import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../App';
import Cookies from 'js-cookie';

export const Sidebar = () => {
    const { handleLogout } = useContext(UserContext);
    const navigate = useNavigate();
    const logout = () => {
        Cookies.remove('token');
        handleLogout()
        navigate('/login');
    }
    return (
        <div className="offcanvas offcanvas-start w-25" tabIndex="-1" id="offcanvas" data-bs-keyboard="false" data-bs-backdrop="false">
            <aside className='container text-center text-primary'>
                <div className="offcanvas-header">
                    <h6 className="offcanvas-title d-none d-sm-block" id="offcanvas">Menu</h6>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div>
                    <h5>Mendez Avelino</h5>
                    <small>ROL: ADMIN</small>
                </div>
                <nav className='navbar-nav'>
                    <li className='nav-item'>
                        <Link to={'/hostal'} className='nav-link'>Hostal</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to={'/users'} className='nav-link'>Usuarios</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to={'/reservas'} className='nav-link'>Reservas</Link>
                    </li>
                </nav>
                    <button onClick={logout}
                    className='btn btn-danger'>
                        Cerrar sessión
                    </button>
            </aside>
        </div>
    )
}
