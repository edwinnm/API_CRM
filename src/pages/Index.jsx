import {Link} from 'react-router-dom'
const Index = () => {
  return (
    <div className="w-full h-screen bg-blue-700 flex items-center justify-center">
        <div className="w-1/2 p-28  bg-white flex items-center justify-center flex-col shadow-2xl rounded-3xl">
            <h1 className='text-5xl text-center md:text-8xl text-blue-800 font-bold'>CRM React APP</h1>
            <Link 
                className="p-6 md:w-3/4 text-center rounded-lg mt-20 text-white text-4xl font-bold bg-blue-700 shadow-inner"
                to="/clientes">
                Iniciar
            </Link>  
        
        </div>   
      
    </div>
  )
}

export default Index
