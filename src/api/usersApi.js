import AxiosInstance from "./AxiosInstance"

export const authUser = async ( userData ) => {
  const { data } = await AxiosInstance.post('/auth/local', userData);
  console.log(data);
  return data
}

export const authUserData = async () => {
  const { data } = await AxiosInstance.get('/users/me');
  return data
}