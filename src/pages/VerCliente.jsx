import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner';

const VerCliente = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const obtenerClienteAPI = async () =>{
      try{
        const URL = `http://localhost:4000/clientes/${id}`
        const respuesta = await fetch(URL)
        const resultado = await respuesta.json()
        console.log(resultado)
        setCliente(resultado)
      }catch(error){
        console.error(error)
      }
      setTimeout( ()=>setCargando(!cargando),500)
      
    }
  obtenerClienteAPI()
    
  }, []);

  return cargando ? (
    <Spinner />
  ) : Object.keys(cliente).length === 0 ? (
    navigate("/clientes")
  ) : (
    <>
      <h1 className="font-black text-4xl text-blue-900">Ver Cliente</h1>
      <p className="mt-3">Informacion del cliente</p>
      {cliente.nombre && (
        <p className="text-3xl mt-10 text-gray-600">
          <span className="text-gray-800 font-bold uppercase">Cliente: </span>
          {cliente.nombre}
        </p>
      )}
      {cliente.email && (
        <p className="text-2xl mt-4 text-gray-600">
          <span className="text-gray-800 font-bold uppercase">Email: </span>
          {cliente.email}
        </p>
      )}
      {cliente.telefono && (
        <p className="text-2xl mt-4 text-gray-600">
          <span className="text-gray-800 font-bold uppercase">Telefono: </span>
          {cliente.telefono}
        </p>
      )}
      {cliente.empresa && (
        <p className="text-2xl mt-4 text-gray-600">
          <span className="text-gray-800 font-bold uppercase">Empresa: </span>
          {cliente.empresa}
        </p>
      )}
      {cliente.notas && (
        <p className="text-2xl mt-4 text-gray-600">
          <span className="text-gray-800 font-bold uppercase">Notas: </span>
          {cliente.notas}
        </p>
      )}
    </>
  );
}

export default VerCliente