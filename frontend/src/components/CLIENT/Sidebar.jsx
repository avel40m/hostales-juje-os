import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../App';
import Cookies from 'js-cookie';

export const Sidebar = () => {
    const { user, handleLogout } = useContext(UserContext);
  const navigate = useNavigate();
    const logout = () => {
        Cookies.set('token','');
        console.log(Cookies.get());
        Cookies.set('token','');
        handleLogout()
        navigate('/login');
      }
  return (
    <div className="offcanvas offcanvas-start w-25" tabIndex="-1" id="offcanvas" data-bs-keyboard="false" data-bs-backdrop="false">
    <nav>
    <div className="offcanvas-header">
        <h6 className="offcanvas-title d-none d-sm-block" id="offcanvas">Menu</h6>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
        <ul className='nav flex-column align-items text-center'>
            <li className='nav-item p-2'>
                <h6>Usuario: {user.username}</h6>
            </li>
            <li className='nav-item p-2'>
                <Link to='/' className='nav-link'>Inicio</Link>
            </li>
            <li className='nav-item p-2'>
                <Link to='/profile' href="#" className='nav-link'>Perfil</Link>
            </li>
            <li className='nav-item p-2'>
                <Link to='/bookings' className='nav-link'>Reservas</Link>
            </li>
            <li className='nav-item p-2'>
                <Link className='nav-link text-danger' onClick={logout}>Cerrar sesión</Link>
            </li>
        </ul>
    </nav>
    </div>
  )
}
