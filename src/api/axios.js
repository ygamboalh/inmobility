import axios from "axios";

export const baseUrl = 'https://sistemacic-backend.herokuapp.com'

export const fetchData = async () => {
  const { data } = await axios.get('https://sistemacic-backend.herokuapp.com/api/properties')
  return data.data
}