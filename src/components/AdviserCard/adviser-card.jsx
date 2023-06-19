

export const AdviserCard = ({ children }) => {
  return (
      <div className='border flex flex-col py-4 lg:my-20 justify-center align-middle lg:p-4 lg:w-full shadow-1 hover:shadow-2xl rounded-lg bg-primary' >
        {children}
      </div>
  )
}