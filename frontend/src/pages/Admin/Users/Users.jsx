import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { getAllUser } from '../../../apis/user';
import DataTable from 'react-data-table-component';

export const Users = () => {
  const cookies = Cookies.get();
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const resp = await getAllUser(cookies?.token);
      setData(resp);
      setUsers(resp);    }
    fetchUsers()
  }, [])
  const column = [
    {
      name: 'Usuario',
      selector: 'username',
      sortable: true
    },
    {
      name: 'Correo',
      selector: 'email',
      sortable: true
    },
    {
      name: 'Creado',
      selector: 'creado',
      sortable: true
    },
  ]

  const paginacionOpcion={
    rowsPerPageText: 'Filas por paginas',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  }
  const handleFilter = (event) => {
    if (event.target.value == "") {
      setUsers(data)
    } else {
      const newData = data.filter(row => {
        return row.username.toLowerCase().includes(event.target.value.toLowerCase());
      })
      setUsers(newData)
    }
  }
  return (
    <main className='container'>
      <div className='row'>
        <div className='col-md-6 m-3' >
          <input type="search"
            className='form-control'
            placeholder='Buscar por usuario'
            onChange={handleFilter} />
        </div>
      </div>
      <DataTable
      columns={column}
      data={users}
      title='Tablas de usuarios'
      noDataComponent='Usuario no encontrado'
      pagination
      paginationComponentOptions={paginacionOpcion}
      fixedHeader
      fixedHeaderScrollHeight='600px'
      />
    </main>
  )
}
