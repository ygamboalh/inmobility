import { useEffect, useState } from 'react';
import { BsFilter } from 'react-icons/bs';
import { ImSpinner2 } from 'react-icons/im';
import { Link, useSearchParams } from 'react-router-dom';
import { baseUrl, fetchApi } from '../api/axios.realstate';
import Property from '../components/Property';
import SearchFilters from '../components/SearchFilters';

const SearchForRent = () => {
  // Para activar los filtros de busqueda
  const [activeFilters, setActiveFilters] = useState(false)
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  // Consulta para Propiedades en Alquiler
  const forRent = `?populate=*&filters[category][isSale]=false`

  // Funcion auxiliar para la peticion a la API
  const getCICData = async (url) => {
    // Todos los datos sin filtrar
    const data = await fetchApi(`${baseUrl}${url ? url : `/api/properties${forRent}`}`)
    setProperties(data)
    setLoading(false)
  }

  // Peticion mediante el hook useEffect con la llamada de funcion auxiliar
  useEffect(() => {
    getCICData()
  }, [])

  if (loading === true) {
    return (
      <ImSpinner2 className='min-h-screen mx-auto animate-spin text-blue-800 text-6xl' />
    )
  }

  return (
    <div className='min-h-screen'>
      <div
        className='flex bg-gray-100 border-b-2 border-gray-200 cursor-pointer font-black p-2 text-lg justify-center align-middle'
        onClick={() => setActiveFilters(!activeFilters)}
      >
        <p>Buscar Propiedades por Filtrado</p>
        <BsFilter className='pl-2 w-7 mt-1' />
      </div>
      {
        activeFilters && <SearchFilters />
      }
      <div className='grid md:grid-cols-2 m-5 lg:grid-cols-3 gap-4 lg:gap-14 mb-10' >
        {properties.map((property, index) => {
          return (
            <Link to={`/property/${property.id}`} key={index} >
              <Property property={property} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default SearchForRent