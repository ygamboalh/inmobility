import AxiosInstance from "./AxiosInstance"

export const authUser = async ( userData ) => {
  const { data } = await AxiosInstance.post('/auth/local', userData);
  return data
}

export const userIntser = async ( userData ) => {
  const { data } = await AxiosInstance.post('/auth/local/register', userData);
  return data
}

// export const updateCategory = async ( categoryData ) => {
//   const { data } = await AxiosInstance.put(`/categories${ id }`, categoryData.id);
//   return data
// }

export const authUserData = async () => {
  const { data } = await AxiosInstance.get('/users/me?populate=*');
  return data
}

export const passedUser = async (id) => {
  const { data } = await AxiosInstance.get(`/users/${id}`);
  return data;
}

export const uploadImage = async (image) => {
  const { data } = await AxiosInstance.post('/upload', image);
  return data
}

export const getAllUsers = async () => {
  const { data } = await AxiosInstance.get('/users?populate=role');
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