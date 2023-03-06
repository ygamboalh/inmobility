import { useState } from 'react'
import { filterDataByVentasDeCasasYApartamentos } from '../utils/filterDataByVentasCasa'

const SearchFilters = ({ searchParams, setSearchParams }) => {

  const [filters, setFilters] = useState(filterDataByVentasDeCasasYApartamentos)

  const searchProperties = (filterValues) => {
  }

  return (
    <div className='flex bg-gray-100 p-4 justify-center flex-wrap gap-5'>
      {
        filters.map((filter) => (
          <div key={filter.queryName} >
            <select
              className='max-w-fit p-2 bg-gray-100 border-2 rounded-xl text-blue-800'
              onChange={(e) => searchProperties({ [filter.queryName]: e.target.value })}
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