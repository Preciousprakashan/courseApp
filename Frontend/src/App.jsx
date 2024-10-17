// src/App.js

import { useState } from 'react';
import './App.css';
import Home from './components/Home/Home';
import Add from './components/Add/Add';
import Navbars from './components/Navbars/Navbars';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CarouselSlider from './components/CarouselSlider/CarouselSlider';
import Edit from './components/Edit/Edit';
import Login from './components/Login/Login'; // Import the Login component

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} /> {/* Login route */}
        
        <Route path='/Home' element={
          <>
            <Navbars /> {/* Only show Navbars on Home */}
            <CarouselSlider />
            <Home />
          </>
        } />
        <Route path='/Edit' element={
          <>
            <Navbars />
            <Edit />
          </>
        } />
        <Route path='/Add' element={
          <>
            <Navbars />
            <Add />
          </>
        } />
      </Routes>
    </>
  );
}

export default App;
