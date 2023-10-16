import Cookies from 'js-cookie';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

export const Navbar = () => {
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
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to={'/'} className='navbar-brand'>Logo</Link>
        <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbarCollapse">
          <ul className='navbar-nav me-auto mb-2 mb-md-0'>
            <li className='nav-item'><Link to={'/places'} className='nav-link'>Lugares</Link></li>
            {
              user && user.rol == 'ADMIN' ?
              <>
                <li className='nav-item'><Link className='nav-link' to={'/dashboard'}>dashboard</Link></li>
                <li className='nav-item'><Link className='nav-link' onClick={logout}>Cerrar sesión</Link></li>
              </>
              :
              user && user.rol == 'CLIENT'
                ?
                <>
                  <li className='nav-item'><Link className='nav-link' to={'/profile'}>{user?.username}</Link></li>
                  <li className='nav-item'><Link className='nav-link' onClick={logout}>Cerrar sesión</Link></li>
                </>
                :
              <li className='nav-item'><Link className='nav-link' to={'/login'}>Ingresar</Link></li>
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}
