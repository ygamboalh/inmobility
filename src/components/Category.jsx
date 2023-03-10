import { Link } from 'react-router-dom'

export const Category = ({ children, title, path }) => {
  return (
    <Link to={path} >
      <div className='border flex flex-col py-14 justify-center align-middle lg:p-20 lg:w-full shadow-1 hover:shadow-2xl rounded-lg bg-blue-900' >
        {children}
        <p>{title}</p>
      </div>
    </Link>
  )
}