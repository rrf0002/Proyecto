import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Articulo from './Pagina_articulo';

import Creacion from './Creacion_articulos';
import Perfil from './Perfil';
import App from './App';
import Admin from './Anadir_admin';
import Login from './login'
export default function router() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path='pagina_articulo' element={<Articulo />}/>
         
            <Route path="crear_post" element={<Creacion />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="login" element={<Login />} />
            <Route path='anadir_admin' element={<Admin/>} />
            <Route path="app" element={<App />} />
            <Route index element={<App />} />

            <Route path="/" element={<App />} >
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }