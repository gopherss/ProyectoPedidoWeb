import React, { useState } from 'react';
import axios from 'axios';


const Pedido = ({ pedido }) => {
    const { _id, tiempoentrega, completado, total, orden } = pedido;
    const [tiempoEntrega, guardarTiempoEntrega] = useState(0);

    const definirTiempo = async _id => {
        try {
            const url = `http://localhost:3000/actualiza-tiempo/${_id}`;
            await axios.patch(url, { tiempoentrega: parseInt(tiempoEntrega) });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="sm:w-1/2 lg:w-1/3 px-2 mb-4">
            <div className="p-3 shadow-md">

                {
                    orden.map(({ _id, nombre, cantidad }) => (
                        <div key={_id}>
                            <h1 className="text-blue-500 text-xl font-bold">
                                {nombre} &#x27a1; {cantidad}
                            </h1>
                        </div>
                    ))
                }

                <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-2  text-2xl font-semibold text-green-400 mr-2 mb-2">
                        Total: S/ {total}
                    </span>
                </div>

                {tiempoentrega === 0 && (
                    <div className="mb-4">
                        <form>
                            <label className="block text-gray-600 text-xl font-bold mb-2">
                                Tiempo Entrega
                            </label>
                            <input
                                type='number'
                                className='shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center'
                                min={10}
                                max={50}
                                placeholder='20'
                                value={tiempoEntrega}
                                onChange={e => guardarTiempoEntrega(e.target.value)}
                                required
                            />
                            <button
                                onClick={() => definirTiempo(_id)}
                                type='submit'
                                className='bg-gray-800 hover:bg-gray-950 w-full mt-5 p-2 text-white uppercase font-bold'>
                                Añadir Tiempo
                            </button>
                        </form>
                    </div>
                )}

                {
                    tiempoentrega > 0 && (
                        <p className="block text-gray-600 text-lg font-bold mb-2">
                            Tiempo de Entrega:
                            <span className='font-bold'> { tiempoentrega } Minutos </span>
                        </p>
                    )
                }
            </div>

        </div>
    );
}

export default Pedido;
