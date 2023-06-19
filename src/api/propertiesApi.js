import AxiosInstance from "./AxiosInstance"

export const authUser = async ( userData ) => {
  const { data } = await AxiosInstance.post('/auth/local', userData);
  console.log(data);
  return data
}

export const getAllProperties = async () => {
  const { data } = await AxiosInstance.get('/properties');
  return data
}