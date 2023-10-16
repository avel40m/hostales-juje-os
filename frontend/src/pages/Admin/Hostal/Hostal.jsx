import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getHostal } from '../../../apis/Hostal';
import DataTable from 'react-data-table-component';

export const Hostal = () => {
  const [hostals, setHostals] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchHostal = async () => {
      const resp = await getHostal();
      setData(resp);
      setHostals(resp);
    }
    fetchHostal();
  }, [])
  const column = [
    {
      name: 'Lugar',
      selector: 'lugar',
      sortable: true
    },
    {
      name: 'Nombre',
      selector: 'nombre',
      sortable: true
    },
    {
      name: 'Precio',
      selector: 'precio',
      sortable: true
    },
    {
      name: 'Detalles',
      cell: (row) => <Link to={`/detalles-hostal/${row.id}`} className='link-opacity-75'>Ver</Link>

    }
  ]
  const paginacionOpcion = {
    rowsPerPageText: 'Filas por paginas',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  }
  const handleFilter = (event) => {
    if (event.target.value == "") {
      setHostals(data)
    } else {
      const newData = data.filter(row => {
        return row.nombre.toLowerCase().includes(event.target.value.toLowerCase());
      })
      setHostals(newData)
    }
  }
  return (
    <main className='container'>
      <div className='row'>
        <div className='col-md-6 m-3' >
          <input type="search"
            className='form-control'
            placeholder='Buscar por nombre'
            onChange={handleFilter} />
        </div>
        <div className="col-md-6">
          <Link to='/agregar-hostal'>Crear hostal</Link>
        </div>
      </div>
      <DataTable
        columns={column}
        data={hostals}
        title='Tablas de Hostal'
        noDataComponent='Hostal no encontrado'
        pagination
        paginationComponentOptions={paginacionOpcion}
        fixedHeader
        fixedHeaderScrollHeight='600px'
      />
    </main>
  )
}
