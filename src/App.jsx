import React from 'react';
import { Routes, Route } from 'react-router';
import Menu from './components/paginas/Menu';
import NuevoPlatillo from './components/paginas/NuevoPlatillo';
import SideBar from './components/UI/Sidebar';
import Pedidos from './components/paginas/Pedidos';

const App = (_) => {

  return (
    <div className='md:flex min-h-screen'>
      <SideBar />

      <div className='md:w-3/5 xl:w-4/5 p-6'>
        <Routes>
          <Route path='/' element={<Pedidos />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/nuevo-platillo' element={<NuevoPlatillo />} />
        </Routes>
      </div>
    </div>
  )
}

export default App

