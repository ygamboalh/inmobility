import React, { useState, useEffect, createContext } from 'react';
import { fetchPropertiesData } from '../api/axios';

export const PropertyContext = createContext()

const PropertiesContextProvider = ({ children }) => {

  // Get properties from strapi cic
  const [strapiProperties, setstrapiProperties] = useState([])

  const getCICData = async (url) => {
    const data = await fetchPropertiesData(url)
    setstrapiProperties(data)
  }

  useEffect(() => {
    getCICData()
  }, [])

  return <PropertyContext.Provider
    value={{ strapiProperties, getCICData }}
  >
    {children}
  </PropertyContext.Provider>
}

export default PropertiesContextProvider