import React, { useContext } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../App';
import { Sidebar } from '../components/CLIENT/Sidebar';

export const ProtectedRouter = () => {
  const { user } = useContext(UserContext);
  if (user == null) {
    return <Navigate to={'/'} />
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
        <Outlet />
      </div>
    </div>
  )
}
