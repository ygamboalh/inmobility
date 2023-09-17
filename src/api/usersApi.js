import { message } from "antd";
import AxiosInstance from "./AxiosInstance"

export const authUser = async (userData) => {
  const { data } = await AxiosInstance.post('/auth/local', userData).catch((error) => {
    
    const err = error.response.data.error.message;
    console.log(err);
    err==="Invalid identifier or password"? message.error(`¡Sus credenciales no son correctas!`):
    message.error(`¡Ocurrió un error. Vuelva a intentarlo!`)
  });   
  
  if (data.user.isLoggedIn === true) {
    message.error("¡Ya usted tiene una sesión abierta!");
    return null;
  }
  else {
    const response = AxiosInstance.put(`/users/${data.user.id}`, {
               isLoggedIn: true 
            })
              .then((res) => {
                return;
              })
              .catch((err) => {
                return;
              });
    return data
  }
}

export const resetPassword = async (userData) => {
  const { data } = await AxiosInstance.post('/auth/reset-password', userData);   
  return data
}

export const channgePassword = async (userData) => {
  const { data } = await AxiosInstance.post('/auth/change-password', userData);   
  return data
}


export const userIntser = async (userData) => {
    const { data } = await AxiosInstance.post('/auth/local/register', userData);
    return data
}

export const authUserData = async () => {
  const { data } = await AxiosInstance.get('/users/me?populate=*');
  return data
}
export const getEmailToken = async () => {
  const { data } = await AxiosInstance.get('/tokens/?filters[type][$eq]=email');
  return data
}
export const passedUser = async (id) => {
  const { data } = await AxiosInstance.get(`/users/${id}?populate=*`);
  return data;
}

export const uploadImage = async (image) => {
  const { data } = await AxiosInstance.post('/upload', image);
  return data
}

export const getAllUsers = async () => {
  const { data } = await AxiosInstance.get('/users?populate=*&pagination[page]=1&pagination[pageSize]=100');
  return data
}
export const getAllLinks = async () => {
  const { data } = await AxiosInstance.get('/links?pagination[page]=1&pagination[pageSize]=100');
  return data
}

export const getActiveUsers = async () => {
  const foundedUsers = [];
  const users  = await getAllUsers();
  users && users.forEach(user => {
      if(user.active === 'Activo') {
        foundedUsers.push(user);
            }
  });
  return foundedUsers;
}

export const getDesactUsers = async () => {
  const foundedUsers = [];
  const users  = await getAllUsers();
  users && users.forEach(user => {
      if(user.active === 'Desactivado') {
        foundedUsers.push(user);
            }
  });
  return foundedUsers;
}
export const getPendingUsers = async () => {
  const foundedUsers = [];
  const users  = await getAllUsers();
  users && users.forEach(user => {
      if(user.active === 'Pendiente') {
        foundedUsers.push(user);
            }
  });
  return foundedUsers;
}