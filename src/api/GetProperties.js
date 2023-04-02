import AxiosInstance from "./AxiosInstance"

export const GetAllProperties = async ({ search, }) => {
  const { data } = await AxiosInstance.get(`/properties${search}`)
  return data.data
}