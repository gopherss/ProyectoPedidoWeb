import React from 'react';
import { Routes, Route } from 'react-router';
import Menu from './components/paginas/Menu';
import NuevoPlatillo from './components/paginas/NuevoPlatillo';
import SideBar from './components/UI/Sidebar';
import Pedidos from './components/paginas/Pedidos';

const App = (_) => {

  return (
    <>
      <SideBar />

      <Routes>
        <Route path='/' element={<Pedidos />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/nuevo-platillo' element={<NuevoPlatillo />} />
      </Routes>

    </>
  )
}

export default App

