import React, { useEffect, useState } from 'react';
import './styles/search.css';
import { getHostalMenu } from '../apis/Hostal';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const Search = () => {
    const [locations, setLocations] = useState([])
    const [value, setValue] = useState('');
    const navigation = useNavigate();

    useEffect(() => {
        const fetchLocation = async () => {
            var response = await getHostalMenu();
            const unique = response.filter(
                (location, index, self) =>
                    self.findIndex(l => l.lugar === location.lugar) == index
            );
            setLocations(unique)
        }
        fetchLocation()
    }, [])

    const onSearch = () => {
        if (value == '')
            return toast.error('Completar el campo')
        let result = locations.some(local => local.lugar == value);
        if (result === false)
            return toast.error('No se pudo encontrar')
        return navigation(`/places?location=${value}`)
    }
    return (
        <div>
            <div className="input-group">
                <i className="fa fa-search"></i>
                <input type="search"
                    list='localidades'
                    className="form-control"
                    placeholder="Buscar por localidad"
                    onChange={(e) => setValue(e.target.value)}
                />
                <button
                    className="btn btn-primary"
                    onClick={onSearch}
                >
                    Buscar
                </button>
            </div>
            <datalist id='localidades'>
                {
                    locations.map((location, index) => (
                        <option key={index} value={location.lugar}>{location.lugar}</option>
                    ))
                }
            </datalist>
        </div>
    )
}
