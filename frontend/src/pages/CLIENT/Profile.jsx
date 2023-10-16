import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { getProfile } from '../../apis/profile';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'

export const Profile = () => {
  const cookie = Cookies.get();
  const [users, setUsers] = useState([])
  useEffect(() => {
    const fetchProfile = async () => {
      let response = await getProfile(cookie.token);
      setUsers(response.data);
    }
    fetchProfile();
  }, [])
  return (
    <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}>
      <section className='container'>
      <div className="text-start">
        {
          !users?.profile ?
          <Link to="/create-profile">Crear perfil</Link>
          :
          <Link to="/edit-profile">Editar perfil</Link>
        }
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Datos</th>
              <th scope='col'>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Usuario</td>
              <td>{users?.username}</td>
            </tr>
            <tr>
              <td>Correo electronico</td>
              <td>{users?.email}</td>
            </tr>
            {
              users?.profile &&
              <>
                <tr>
                  <td>Provincia</td>
                  <td>{users?.province}</td>
                </tr>
                <tr>
                  <td>Ciudad</td>
                  <td>{users?.city}</td>
                </tr>
                <tr>
                  <td>Departamento</td>
                  <td>{users?.location}</td>
                </tr>
                <tr>
                  <td>Barrio</td>
                  <td>{users?.sector}</td>
                </tr>
                <tr>
                  <td>Telefono</td>
                  <td>{users?.phone}</td>
                </tr>
              </>
            }
            <tr>
              <td>Creado</td>
              <td>{users?.createdAt}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </motion.div>
  )
}
