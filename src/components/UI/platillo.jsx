import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

//Toast notifications
import toast, { Toaster } from 'react-hot-toast';


const socket = io('http://127.0.0.1:3000');


const Platillo = ({ platillo }) => {


    const existenciaRef = useRef(platillo.disponible);
    const idRef = platillo._id;

    const { nombre, imagen, disponible, categoria, precio, descripcion } = platillo;
    const { url } = imagen;

    useEffect((_) => {

        socket.on('producto', producto => console.log(producto));
        return _ => {
            socket.off('producto', producto => console.log(producto));
        }

    }, []);

    const actualizarDisponibilidad = async (_) => {
        const existencia = (existenciaRef.current.value === 'true');
        const datos = { '_id': idRef, 'disponible': existencia };
        try {
            const url = 'http://127.0.0.1:3000/editar-disponibilidad';
            const response = await axios.put(url, datos);
            console.log();
            toast((response.data.mensaje + ' Actualizado').toUpperCase())

        } catch (error) {
            console.log(error);
        }
    }


    return (

        <div className='w-full px-3 mb-4'>
            <div className="p-5 shadow-md bg-white">
                <div className="lg:flex">
                    <div className="lg:w-5/12 xl:w-3/12">
                        <img src={url} alt="imagen platillo" />

                        <div className="sm:flex sm:-mx-2 pl-3">
                            <div className='block mt-5 sm:w-2/4 lg:w-5/6'>
                                <span
                                    className='block text-gray-800 mb-2'>Existencia</span>
                                <select
                                    name='disponible'
                                    className='bg-slate-50 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                                    defaultValue={disponible}
                                    ref={existenciaRef}
                                    onChange={actualizarDisponibilidad}
                                >
                                    <option value={true}>Disponible</option>
                                    <option value={false}>No Disponible</option>
                                </select>
                                <Toaster
                                    toastOptions={{
                                        className: 'flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-100 dark:divide-gray-700 space-x dark:bg-gray-800',
                                        icon: '✅'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-7/12 xl:w-9/12 pl-6">
                        <p className='font-bold text-2xl text-green-500 mb-4'> {nombre} </p>
                        <p className="text-zinc-800 mb-4">Categoria: {' '}
                            <span className='text-zinc-950 font-bold'>{categoria.toUpperCase()}</span>
                        </p>
                        <p className="text-gray-600 mb-4">{descripcion}</p>

                        <p className="text-zinc-800 mb-4">Precio: {' '}
                            <span className='text-zinc-950 font-bold'>S/. {precio}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Platillo;

