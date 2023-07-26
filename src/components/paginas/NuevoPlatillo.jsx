import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://127.0.0.1:3000');


const NuevoPlatillo = (_) => {

    //Hook para redireccionar
    const navigate = useNavigate();
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: '',
        categoria: '',
        imagen: null,
        descripcion: '',
    })

    return (
        <>
            <div className="p-4 sm:ml-64 mt-16">
                <h1 className='text-4xl font-extrabold text-gray-900 '>
                    Nuevo Platillo
                </h1>
            </div>

            <div className="p-4 sm:ml-64">
                <div className="w-full max-w-3xl">
                    <h1 className='text-xl font-semibold text-blue-600/100 dark:text-blue-500/100 text-center'>Registra Tu Platillo</h1>


                    <Formik
                        initialValues={producto}
                        enableReinitialize
                        validationSchema={Yup.object({
                            nombre: Yup.string()
                                .min(3, 'Los Platillos deben tener almenos 3 letras')
                                .required('El Nombre del platillo es obligatorio'),

                            precio: Yup.number()
                                .min(1, 'Debes agregar el precio valido ejemplo: S/50 ')
                                .required('El precio es obligatorio'),

                            categoria: Yup.string()
                                .required('Selecciona una Categoria'),

                            descripcion: Yup.string()
                                .min(15, 'La descripcion debe contener todos los ingredientes')
                                .required('La Descripcion es obligatoria'),
                        })}
                        onSubmit={async (datos, actions) => {
                            try {
                                datos.disponible = true;

                                console.log(datos);
                                socket.emit('producto', datos);

                                const url = 'http://127.0.0.1:3000/guardar-producto';
                                const forms = new FormData();

                                for (const key in datos) {
                                    forms.append(key, datos[key]);
                                }

                                const response = await axios.post(url, forms, {
                                    headers: {
                                        "Content-Type": "mulipart/form-data"
                                    }
                                });
                                console.log(response);

                                actions.resetForm();
                                actions.setSubmitting(false);
                                navigate('/menu');

                            } catch (error) {
                                console.log(error);
                            }
                        }}
                    >

                        {({ setFieldValue, isSubmitting, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label
                                        className='block text-gray-700 text-sm font-bold mb-2'
                                        htmlFor='nombre'>
                                        Nombre
                                    </label>
                                    <Field
                                        id='nombre'
                                        type='text'
                                        name='nombre'
                                        placeholder='Nombre platillo'
                                        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' />
                                    <ErrorMessage
                                        component='p'
                                        name='nombre'
                                        className='bg-red-100 border-l-4 border-red-500 text-red-900 p-4 mb-5'
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        className='block text-gray-700 text-sm font-bold mb-2'
                                        htmlFor='precio'>
                                        Precio
                                    </label>
                                    <Field
                                        id='precio'
                                        type='number'
                                        name='precio'
                                        min={0}
                                        placeholder='S/. 20'
                                        className='bg-gray-200 text-center appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' />

                                    <ErrorMessage
                                        component='p'
                                        name='precio'
                                        className='bg-red-100 border-l-4 border-red-500 text-red-900 p-4 mb-5'
                                    />
                                </div>


                                <div className="mb-4">
                                    <label
                                        className='block text-gray-700 text-sm font-bold mb-2'
                                        htmlFor='categoria'>
                                        Categoria
                                    </label>

                                    <Field
                                        id='categoria'
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                        as='select'
                                        name='categoria'
                                    >
                                        <option value="">SELECCIONAR...</option>
                                        <option value="desayuno">Desayuno</option>
                                        <option value="almuerzo">Almuerzo</option>
                                        <option value="cena">Cena</option>
                                        <option value="bebidas">Bebidas</option>
                                        <option value="postres">Postres</option>
                                        <option value="piqueos">Piqueos</option>
                                        <option value="ensaladas">Ensaladas</option>
                                    </Field>

                                    <ErrorMessage
                                        component="p"
                                        name='categoria'
                                        className='bg-red-100 border-l-4 border-red-500 text-red-900 p-4 mb-5'
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        className='block text-gray-700 text-sm font-bold mb-2'
                                        htmlFor='imagen'>
                                        Imagen
                                    </label>
                                    <input
                                        id='imagen'
                                        type='file'
                                        name='imagen'
                                        accept='image/png, image/PNG,image/jpeg, image/JPEG image/jpg'
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                        onChange={e => setFieldValue('imagen', e.target.files[0])}
                                    />

                                    <ErrorMessage
                                        component="p"
                                        name='imagen'
                                        className='bg-red-100 border-l-4 border-red-500 text-red-900 p-4 mb-5'
                                    />
                                </div>



                                <div className="mb-4">
                                    <label
                                        className='block text-gray-700 text-sm font-bold mb-2'
                                        htmlFor='descripcion'>
                                        Descripcion
                                    </label>
                                    <Field
                                        id='descripcion'
                                        name='descripcion'
                                        placeholder='Descripcion del platillo'
                                        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                                    ></Field>

                                    <ErrorMessage
                                        component="p"
                                        name='descripcion'
                                        className='bg-red-100 border-l-4 border-red-500 text-red-900 p-4 mb-5'
                                    />

                                </div>
                                <div className="my-2">
                                    <button
                                        type='submit'
                                        className='inline-block mb-5 p-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-full'
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <span>No Registrar</span>
                                        ) : ("Registrar")}
                                    </button>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
}

export default NuevoPlatillo;

