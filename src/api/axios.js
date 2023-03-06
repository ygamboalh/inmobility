import axios from "axios";

export const baseUrl = 'https://sistemacic-backend.herokuapp.com'

export const fetchPropertiesData = async (url) => {
  const { data } = await axios.get(`${baseUrl}${url ? url : '/api/properties'}`)
  return data.data
}