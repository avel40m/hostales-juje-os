import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../App';
import { Sidebar } from '../components/ADMIN/Sidebar';
import { AiOutlineMenu } from 'react-icons/ai';


export const ProtectedAdmin = () => {
  const { user } = useContext(UserContext);
  if (user == null) {
    return <Navigate to={'/login'} />
  }
  if (user.rol != 'ADMIN') {
    return <Navigate to={'/login'} />
  }
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div>
      <button className="btn float-end" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" role="button">
          <AiOutlineMenu size={30} />
        </button>
        <Outlet/>
      </div>
    </div>
  )
}
