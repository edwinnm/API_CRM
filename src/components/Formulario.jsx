import { Formik, Form, Field } from "formik"
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from "./Alerta"

const Formulario = ({cliente}) => {
    const navigate = useNavigate()
    const newClientSchema = Yup.object().shape({
        nombre: Yup.string()
                    .min(3, 'El nombre es muy corto.')
                    .max(20, 'El nombre es muy largo.')
                    .required('El nombre del cliente es obligatorio.'),
        empresa: Yup.string()
                    .required('El nombre de la empresa del cliente es obligatorio.'),
        email: Yup.string()
                .email('E-mail no válido.')
                .required('El e-mail del cliente es obligatorio.'),
        telefono: Yup.number()
                .positive('El teléfono no válido.')
                .integer('El teléfono no válido.')
                .typeError('El teléfono no válido.'),
    })
    const handleSubmit = async(values)=>{
        console.log(values)
        try{
            let url, method = ''
            if(cliente.id){
                url = `${import.meta.env.VITE_API_URL}/${cliente.id}`
                method = 'PUT'
            }else{
                url = import.meta.env.VITE_API_URL
                method = 'POST'
            }
  
            const respuesta = await fetch(url,{
                method: method,
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const resultado = await respuesta.json()
            console.log(resultado)
            navigate('/clientes')
        }catch (error){
            console.log(error)
        }
    }

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
        <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
            {cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
        </h1>
        <Formik
            initialValues={{
                nombre: cliente?.nombre ?? "",
                empresa: cliente?.empresa ?? "",
                email: cliente?.email ?? "",
                telefono: cliente?.telefono ?? "",
                notas: cliente?.notas ?? ""
            }}
            enableReinitialize={true}
            onSubmit={ async (values, {resetForm})=>{
                await handleSubmit(values)
                resetForm()
            }}
            validationSchema={newClientSchema}>
            {({errors, touched})=>{

                return(
                <Form
                    className="mt-10">
                    <div className="mb-4">
                        <label 
                            className="text-gray-800 text-lg"
                            htmlFor="nombre">Nombre: </label>
                        <Field
                            id='nombre'
                            type='text'
                            className='mt-2 block w-full p-3 bg-gray-50'
                            placeholder='Nombre del cliente'
                            name='nombre'
                        />
                        {errors.nombre  && touched.nombre ?
                        (<Alerta>
                            {errors.nombre}
                        </Alerta>
                        ): null
                        }
                    </div>
                    <div className="mb-4">
                        <label 
                            className="text-gray-800 text-lg"
                            htmlFor="empresa">Empresa: </label>
                        <Field
                            id='empresa'
                            type='text'
                            className='mt-2 block w-full p-3 bg-gray-50'
                            placeholder='Empresa del cliente'
                            name='empresa'
                        />
                        {errors.empresa  && touched.empresa ?
                        (<Alerta>
                            {errors.empresa}
                        </Alerta>
                        ): null
                        }
                    </div>
                    <div className="mb-4">
                        <label 
                            className="text-gray-800 text-lg"
                            htmlFor="email">E-mail: </label>
                        <Field
                            id='email'
                            type='email'
                            className='mt-2 block w-full p-3 bg-gray-50'
                            placeholder='Email del cliente'
                            name='email'
                        />
                        {errors.email  && touched.email ?
                        (<Alerta>
                            {errors.email}
                        </Alerta>
                        ): null
                        }
                    </div>
                    <div className="mb-4">
                        <label 
                            className="text-gray-800 text-lg"
                            htmlFor="telefono">Teléfono </label>
                        <Field
                            id='telefono'
                            type='tel'
                            className='mt-2 block w-full p-3 bg-gray-50'
                            placeholder='Telefono del cliente'
                            name='telefono'
                        />
                        {errors.telefono  && touched.telefono ?
                        (<Alerta>
                            {errors.telefono}
                        </Alerta>
                        ): null
                        }
                    </div>
                    <div className="mb-4">
                        <label 
                            className="text-gray-800 text-lg"
                            htmlFor="notas">Notas </label>
                        <Field
                            as='textarea'
                            id='notas'
                            type='text'
                            className='mt-2 block w-full p-3 bg-gray-50 h-40'
                            placeholder='Notas del cliente'
                            name='notas'
                        />

                    </div>
                    <input type="submit" value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'} className="bg-blue-800 w-full text-white uppercase font-blod text-lg mt-5 p-3" />
                </Form>
                )
            }}
        </Formik>
    </div>
  )
}

Formulario.defaultProps = {
    cliente: {}
}

export default Formulario