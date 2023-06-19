import { 
  AUTH_TOKEN,
  AUTH_USER,
  ACCESS_TOKEN_STATE,
  ACCESS_TOKEN_TYPE, 
  ACCESS_TOKEN_STORAGE
} from "../constant";

export const storeUser = (data) => {
    localStorage.setItem('user', JSON.stringify({
        username: data.user.username,
        jwt:data.jwt,
    })
    );
};

export const userData = () => {
    const stringifyfiedUser = localStorage.getItem('user') || '""';
    return JSON.parse(stringifyfiedUser || {});
};

export const getToken = () => {
  return localStorage.getItem(AUTH_TOKEN);
};
export const getUser = () => {
  return localStorage.getItem(AUTH_USER);
};  

 export const setToken = (token) => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
}; 
export const setUserLocal = (user) => {
  if (user) {
    localStorage.setItem(AUTH_USER, user);
  }
}; 
 
export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(AUTH_USER);
  localStorage.removeItem(ACCESS_TOKEN_STATE);
  localStorage.removeItem(ACCESS_TOKEN_TYPE); 
  localStorage.removeItem(ACCESS_TOKEN_STORAGE);  
};