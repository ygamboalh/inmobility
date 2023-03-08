import axios from "axios";

export const AxiosInterceptor = () => {

  axios.interceptors.request.use((request) => {
    // console.log('Creado peticion', request);
    return request
  },
    (error) => {
      // console.log(error);
      return Promise.reject(error)
    }
  )

  axios.interceptors.response.use((response) => {
    // console.log('Respuesta', response);
    return response
  },
    (error) => {
      // console.log("Error", error);
      return Promise.reject(error)
    }
  )
}