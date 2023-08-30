import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import Pedido from '../UI/pedido';

const Pedidos = (_) => {
    const [pedidos, guardarPedidos] = useState([]);

    const obtenerPedidos = async () => {
        const url = 'http://localhost:3000/obtener-pedido-no-completado';
        const respuesta = await axios.get(url);
        guardarPedidos(respuesta.data);
    }

    useEffect(() => {
        obtenerPedidos();
    }, []);


    return (
        <>
            <div className="p-4 sm:ml-64 mt-10">
                <div className="p-4  border-2 border-gray-200 rounded-lg">
                    <h1 className='text-4xl font-extrabold text-gray-900 '>
                        Pedidos
                    </h1>
                    <div className="sm:flex sm:flex-wrap -mx-3">
                        {pedidos.map(pedido => (
                            <Pedido
                                key={pedido._id}
                                pedido={pedido}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Pedidos;

