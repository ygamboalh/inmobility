import { useEffect, useState } from 'react';
import { BsFilter } from 'react-icons/bs';
import { Link, useSearchParams } from 'react-router-dom';
import { baseUrl, fetchApi } from '../api/axios.realstate';
import SearchFilters from '../components/SearchFilters';
import Property from '../components/Property';
import { ImSpinner2 } from 'react-icons/im'

const Search = () => {
  // Para activar los filtros de busqueda
  const [searchFilters, setSearchFilters] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  // Accion a realizar Venta o Alquiler desde las query params
  const filtro = searchParams.get('filtro')

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  // Funcion auxiliar para la peticion a la API
  const getCICData = async (url) => {
    const province = searchParams.get('province') || 'Limón'
    const price = searchParams.get('price') || '110000'
    const footage = searchParams.get('footage') || '36674.94'
    const canton = searchParams.get('canton') || 'Pococí'
    const district = searchParams.get('district') || 'La Rita'
    const maintainingPrice = searchParams.get('maintainingPrice') || '0'
    const parkingNumber = searchParams.get('parkingNumber') || '0'
    const law7600 = searchParams.get('law7600') || 'true'

    // Todos los datos sin filtrar 
    const data = await fetchApi(`${baseUrl}${url ? url : `/api/properties`}`)

    // Todos los datos filtrados
    // const data = await fetchApi(`${baseUrl}${url ? url : `/api/properties?filters[province][$eq]=${province}&filters[price][$eq]=${price}&filters[footage][$eq]=${footage}&filters[canton][$eq]=${canton}&filters[district][$eq]=${district}&filters[maintainingPrice][$eq]=${maintainingPrice}&filters[parkingNumber][$eq]=${parkingNumber}&filters[law7600][$eq]=${law7600}`}`)

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
        onClick={() => setSearchFilters(!searchFilters)}
      >
        <p>Buscar Propiedades por Filtrado</p>
        <BsFilter className='pl-2 w-7 mt-1' />
      </div>
      {
        searchFilters && <SearchFilters searchParams={searchParams} setSearchParams={setSearchParams} />
      }
      <p className='text-2xl p-4 font-bold ml-20'>
        Propiedades para {filtro}
      </p>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14 mb-10' >
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

export default Search