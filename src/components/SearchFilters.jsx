import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getQueryByValue } from '../utils'

const SearchFilters = ({ data }) => {
  // Cargando los datos de consultas en un estado
  const [filters, setFilters] = useState(data)

  // Inicializacion para los parametros de busquedas
  const [params, setParams] = useSearchParams()

  // Funcion Auxiliar para el manejo de las consultas, recibe los filtros desde el dropdown con sus opciones
  const makeQueries = (filterValue) => {

    // Funcion que devuelve la consulta que se introduce en la url para cada dropdown modificado
    const valuesFiltered = getQueryByValue(filterValue)

    // Estebleciendo los parametros de consultas dependiendo la consulta retornada, 
    // si el valor es uno por defecto entonces se borra esa consulta en particular
    params.set(
      `${valuesFiltered[0].name}`,
      `${valuesFiltered[0].value}`)
    if (valuesFiltered[0].value === "defaultValue") {
      params.delete(`${valuesFiltered[0].name}`)
    }
    setParams(params)
  }

  return (
    <div className='flex bg-gray-100 p-4 justify-center flex-wrap gap-5'>
      {
        filters.map((filter) => (
          <div key={filter.consulta} >
            <select
              className='max-w-fit p-2 bg-gray-100 border-2 rounded-xl text-blue-800'
              onChange={(e) => makeQueries({ [filter.consulta]: e.target.value })}
            >
              <option value="defaultValue">{filter.placeholder}</option>
              {
                filter?.items?.map((item) => (
                  <option
                    value={item.value}
                    key={item.value}
                  >{item.name}
                  </option>
                ))
              }
            </select>
          </div>
        ))
      }
    </div >
  )
}

export default SearchFilters
