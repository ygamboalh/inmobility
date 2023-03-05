import React, { useState, useEffect, createContext } from 'react';
import { fetchData } from '../api/axios';

export const PropertyContext = createContext()

const PropertiesContextProvider = ({ children }) => {

  // Get properties from strapi Nexo
  const [strapiProperties, setstrapiProperties] = useState([])

  const getNexoData = async () => {
    const data = await fetchData()
    setstrapiProperties(data)
  }

  useEffect(() => {
    try {
      getNexoData()
    } catch (error) {
      console.log(error)
    }
  }, [])

  return <PropertyContext.Provider
    value={{ strapiProperties }}
  >
    {children}
  </PropertyContext.Provider>
}

export default PropertiesContextProvider