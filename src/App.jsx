import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Layout from './layout/Layout'
import Index from './pages/Index'
import Inicio from './pages/Inicio'
import NuevoCliente from './pages/NuevoCliente'
import EditarCliente from './pages/EditarCliente'
import VerCliente from './pages/VerCliente'


function App() {
  
  return (
    <BrowserRouter basename="/API_CRM">
      <Routes>
        <Route path='/clientes' element={<Layout/>}>
          <Route index element={<Inicio/>}/>
          <Route path='nuevo' element={<NuevoCliente/>}/>
          <Route path='editar/:id' element={<EditarCliente/>}/>
          <Route path=':id' element={<VerCliente/>}/>
        </Route>
        <Route path='/' element={<Index/>}/>
        
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
