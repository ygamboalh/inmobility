export const AdvertiserProfile = () => {
  return (
    <div className='flex-1 bg-white w-full mb-8 border border-b-gray-300 rounded-lg px-6 py-8' >
      <div className='flex items-center gap-x-4 mb-8' >
        <div className='w-20 h-20 p-1 border border-b-gray-300 rounded-full' >
          {/* <img src={property.agent.image} alt="" /> */}
        </div>
        <div>
          {/* <div className='font-bold text-lg' >{property.advertiserName}</div> */}
          <Link
            to=''
            className='text-blue-700 text-sm'
          >Ver Perfil</Link>
        </div>
      </div>
      {/* form */}
      <form className='flex flex-col gap-y-4' onClick={(e) => {
        e.preventDefault()
      }} >
        <input
          className='border border-gray-300 focus:border-blue-700 outline-none rounded w-full px-4 h-14 text-sm'
          type="text"
          placeholder='Nombre*'
        />
        <input
          className='border border-gray-300 focus:border-blue-700 outline-none rounded w-full px-4 h-14 text-sm'
          type="text"
          placeholder='Correo*'
        />
        <input
          className='border border-gray-300 focus:border-blue-700 outline-none rounded w-full px-4 h-14 text-sm'
          type="text"
          placeholder='Telefono*'
        />
        <textarea
          className='border border-gray-300 focus:border-blue-700 outline-none rounded w-full p-4 h-36 text-sm text-gray-400' placeholder='Message*'
          defaultValue='Hola, estoy interesado en este inmueble'
        ></textarea>
        <div className='flex gap-x-2' >
          <button className='bg-blue-700 hover:bg-blue-800 rounded p-4 text-white text-sm w-full transition' >Enviar Mensaje</button>
          <button className='border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500 rounded p-4 text-sm w-full transition' >Llamar</button>
        </div>
      </form>
    </div>
  )
}