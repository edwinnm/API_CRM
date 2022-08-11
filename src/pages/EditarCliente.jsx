import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner';
import Formulario from "../components/Formulario"

const EditarCliente = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const obtenerClienteAPI = async () =>{
      try{
        const URL = `${import.meta.env.VITE_API_URL}/${id}`
        const respuesta = await fetch(URL)
        const resultado = await respuesta.json()
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
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">Llena los siguientes campos para editar un cliente</p>
      <Formulario cliente={cliente}/>
    </>
  );
}

export default EditarCliente