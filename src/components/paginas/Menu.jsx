/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios'

import Platillo from '../UI/platillo';

const Menu = (_) => {
    const [platillos, guardarPlatillos] = useState([]);


    const obtenerProducto = async () => {
        const url = 'http://localhost:3000/obtener-producto';
        const respuesta = await axios.get(url);
        guardarPlatillos(respuesta.data)
    }

    useEffect(() => {
        obtenerProducto();
    }, []);


    return (
        <>
            <div className="p-4 sm:ml-64 mt-10">
                <div className="p-4  border-2 border-gray-200 rounded-lg">

                    <h1 className='text-4xl font-extrabold text-gray-900'>
                        Menú del día
                    </h1>

                    <NavLink
                        className={'inline-block my-5 p-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'}
                        to={'/nuevo-platillo'}>
                        Agregar Platillo
                    </NavLink>
                    {
                        platillos.map(platillo => (
                            <Platillo
                                key={platillo._id}
                                platillo={platillo}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default Menu;

