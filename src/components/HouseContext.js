import React, { useState, useEffect, createContext } from 'react';

// Import data
import { housesData } from '../data'

// Create context
export const HouseContext = createContext()

const HouseContextProvider = ({ children }) => {

  const [houses, setHouses] = useState(housesData)
  const [country, setCountry] = useState('Location (any)')
  const [countries, setCountries] = useState([])
  const [property, setProperty] = useState('Property type (any)')
  const [properties, setProperties] = useState([])
  const [price, setPrice] = useState('Price range (any)')
  const [loading, setLoading] = useState(false)

  // return all countires
  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country;
    })
    // Remove duplicaties
    const uniqueCountries = ['Location (any)', ...new Set(allCountries)]

    // Set countries state
    setCountries(uniqueCountries)
  }, [])

  // return all properties
  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type;
    })

    // Remove duplicaties
    const uniqueProperties = ['Location (any)', ...new Set(allProperties)]

    // Set prperties state
    setProperties(uniqueProperties)
  }, [])

  const handleClick = () => {
    console.log('clicked');
  }

  // return all properties
  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type;
    })

    // Remove duplicaties
    const uniqueProperties = ['Location (any)', ...new Set(allProperties)]

    // Set prperties state
    setProperties(uniqueProperties)
  }, [])

  return <HouseContext.Provider
    value={{
      country,
      setCountry,
      countries,
      property,
      setProperty,
      properties,
      price,
      setPrice,
      houses,
      loading,
      handleClick
    }} >
    {children}
  </HouseContext.Provider>;
};

export default HouseContextProvider;
