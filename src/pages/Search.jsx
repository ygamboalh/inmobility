import { useQuery } from '@tanstack/react-query';
import { ImSpinner2 } from 'react-icons/im';
import { useLocation, useNavigate, useResolvedPath, useSearchParams } from 'react-router-dom';
import { GetAllProperties } from '../api/GetProperties';
import { VentaCasaApartmento } from '../components/Searchers/VentaCasaApartmento';
import { useIsSearched } from '../store/Globals';
import { QueriesByFilters } from '../utils/QueriesByFilters';
import { Properties } from './Properties';

const Search = () => {
  const navigate = useNavigate()
  const { isSearched, setIsSearched } = useIsSearched()
  // console.log(isSearched);
  // const [isSearched, setIsSearched] = useState(false)

  // ? Hook para manipular la URL e introducir los parametros de consulta
  const [params, setParams] = useSearchParams()
  // console.log(params);

  // ? Consultas que se reciben desde la url que introduce la pagina anterior
  const { search } = useLocation()
  // console.log(search);

  // ? El pathname informa el proposito de la consulta, venta o alquiler
  const { pathname } = useResolvedPath()
  // console.log(pathname);

  // ? Hook para la llamada a la api con el proposito, venta o alquiler
  const { data, isLoading, isError, isSuccess, error } = useQuery(
    {
      queryKey: ['properties', search],
      queryFn: () => GetAllProperties({ search })
    }
  )

  // ? Funcion para introducir las consultas en la URL
  const makeQueries = (filterValue) => {

    //** Recibe los filtros y retorna consultas */
    const valuesFiltered = QueriesByFilters(filterValue)
    console.log(valuesFiltered);

    valuesFiltered.map((value) => {
      // * Almacena los valores de las consultas en el arreglo de params para luego pasarlos a setParams y actualizar el path
      params.set(value.name, value.value)
      if (value.value === "") {
        params.delete(value.name)
      }
    })
    setParams(params)
    setIsSearched(!isSearched)
  }

  // * Condicion para mostrar cargando
  if (isLoading) {
    return (
      <ImSpinner2 className='min-h-screen mx-auto animate-spin text-primary text-6xl' />
    )
  }

  //** Errores que ocurran en la peticion */
  if (isError) {
    return <span>Error: {error.message}</span>
  }

  // TODO: Falta por hacer la condicion de renderizado para los filtros por ruta
  return (
    <div>
      {
        !isSearched
          ?
          <VentaCasaApartmento makeQueries={makeQueries} />
          :
          <Properties data={data} />
      }
    </div>
  )
}

export default Search