import React, { useEffect, useState } from 'react'
import { getAllBookings } from '../../../apis/bookings';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

export const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchBookings = async () => {
            const response = await getAllBookings();
            setBookings(response)
            setData(response)
        }
        fetchBookings();
    },[])
    const column = [
      {
        name:'Lugar',
        selector:'lugar',
        sortable:true
      },
      {
        name:'Fecha de llegada',
        selector:'checkin',
        sortable:true
      },
      {
        name:'Fecha de salida',
        selector:'checkout',
        sortable:true
      },
      {
        name: 'Detalles',
        cell: (row) => <Link to={`/reservas/${row.id}/pago`} className='link-opacity-75'>ver</Link>
  
      }
    ]
    const paginacionOpcion={
      rowsPerPageText: 'Filas por paginas',
      rangeSeparatorText: 'de',
      selectAllRowsItem: true,
      selectAllRowsItemText: 'Todos',
    }
  return (
    <main className='container'>
        <DataTable
      columns={column}
      data={bookings}
      title='Tablas de reservas'
      noDataComponent='Reserva no encontrado'
      pagination
      paginationComponentOptions={paginacionOpcion}
      fixedHeader
      fixedHeaderScrollHeight='600px'
      />
    </main>
  )
}
