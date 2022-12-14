import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/views/Home'
import AdministrarProductos from './components/views/producto/AdministrarProductos'
import CrearProducto from './components/views/producto/CrearProducto'
import EditarProducto from './components/views/producto/EditarProducto'
import Error404 from './components/views/Error404'
import Menu from './components/common/Menu';
import Footer from './components/common/Footer';
import DetalleProducto from './components/views/DetalleProducto';
import Login from './components/views/Login';
import Registro from './components/views/Registro';
import { useState } from 'react';
import RutaProtegida from './components/routes/RutaProtegida';

function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState({})

  return (
  
      <BrowserRouter>
        <Menu usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado}></Menu>
        <Routes>
          <Route exact path='/' element={<Home></Home>} ></Route>
          <Route exact path='/login' element={<Login setUsuarioLogueado={setUsuarioLogueado}></Login>} ></Route>
          <Route exact path='/registro' element={<Registro setUsuarioLogueado={setUsuarioLogueado}></Registro>} ></Route>
          <Route exact path='/administrar/producto/detalle/:id' element={<DetalleProducto></DetalleProducto>}></Route>
         <Route path='/*' element={
          <RutaProtegida>
            <Routes>
              <Route exact path='/administrar' element={<AdministrarProductos></AdministrarProductos>} ></Route>
              <Route exact path='/administrar/crear' element={<CrearProducto></CrearProducto>} ></Route>
              <Route exact path='/administrar/editar/:id' element={<EditarProducto></EditarProducto>} ></Route>
            </Routes>
          </RutaProtegida>
         }>
         </Route>
          <Route path='*' element={<Error404></Error404>}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
  );
}

export default App;
