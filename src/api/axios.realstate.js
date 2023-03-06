import axios from "axios";

export const baseUrl = 'https://sistemacic-backend.herokuapp.com'

export const fetchApi = async (url) => {
  const { data } = await axios.get((url))
  return data.data
}