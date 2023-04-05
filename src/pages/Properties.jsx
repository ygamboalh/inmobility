import { Property } from '../components';
import { useNavigate } from 'react-router-dom';
import { useIsSearched } from '../store/Globals';

export const Properties = ({ data }) => {
  const navigate = useNavigate()
  const { isSearched, setIsSearched } = useIsSearched()

  return (
    <div className='min-h-screen'>
      <div
        className='cursor-pointer mx-auto mt-4 max-w-xs text-center justify-center text-blue-800 border-2 p-1 border-blue-900 rounded-full'
        onClick={() => setIsSearched(!isSearched)}
      >Atras</div>
      <div className='grid md:grid-cols-2 m-5 lg:grid-cols-3 gap-4 lg:gap-14 mb-10' >
        {data?.map((property, index) => {
          return (
            // <Link to={`/property/${property.id}`} key={index} state={{ property }} >

            <Property property={property} key={index} />

            // </Link>
          )
        })}
      </div>
    </div>
  )
}