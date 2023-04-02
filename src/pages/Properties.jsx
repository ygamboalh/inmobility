import { Property } from '../components';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const Properties = ({ data }) => {
  // const { data } = useParams()
  // console.log(data);
  return (
    <div className='min-h-screen'>
      <div className='grid md:grid-cols-2 m-5 lg:grid-cols-3 gap-4 lg:gap-14 mb-10' >
        {data?.map((property, index) => {
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