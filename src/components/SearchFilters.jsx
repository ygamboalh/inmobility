import { useState } from 'react'
import { filterDataByVentasDeCasasYApartamentos, getFilterValues } from '../utils/filterDataByVentasCasa'
import { useSearchParams } from 'react-router-dom'

const SearchFilters = () => {

  const [filters, setFilters] = useState(filterDataByVentasDeCasasYApartamentos)
  const [params, setParams] = useSearchParams('')

  const searchProperties = (filterValues) => {
    const values = getFilterValues(filterValues)
    const valuesFiltered = values.filter((item) => item.value !== undefined)

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
              onChange={(e) => searchProperties({ [filter.consulta]: e.target.value })}
            // onChange={(e) => console.log(e.target.value)}
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