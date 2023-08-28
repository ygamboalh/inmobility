
import axios from "axios";
import AxiosInstance from "../api/AxiosInstance";
import { 
  AUTH_TOKEN,
  AUTH_USER,
  ACCESS_TOKEN_STATE,
  ACCESS_TOKEN_TYPE, 
  ACCESS_TOKEN_STORAGE,
  API
} from "../constant";
import { useSignOut } from "react-auth-kit";


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
export const getUserRole = () => {
  return localStorage.getItem(ACCESS_TOKEN_STATE);
};
export const getUserTokenDate = () => {
  return localStorage.getItem(ACCESS_TOKEN_STORAGE);
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


export const  generateRandomCode = () => {
    const length = 6;
    const characters = '0123456789';
    let randomCode = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomCode += characters[randomIndex];
    }

    return randomCode;
  };
export const createNotification = (type, information,reference) => {
  const response = AxiosInstance.post(`/notifications`, {
    data: { type: type, information: information, expire:Date.now(), reference: reference},
}).then((response) => console.log(response)).catch((error) => console.log(error))
}

export function deleteZero(string) {
    if (string?.startsWith("0") && string?.length > 1) {
      return string?.slice(1);
    } else {
      return string;
    }
  }
export const deleteNotification = async () => {
  let notifications = [];
  const res = await AxiosInstance.get(`${API}notifications`)
      .then((response) => {
        const data = response.data.data;
        notifications = data.reverse();
      })
      .catch((err) => {
        return;
      });
      const currentDate = new Date();
      const currentDateString = currentDate.toISOString().split("T")[0];
      const currentTimeString = currentDate
      .toISOString()
      .split("T")[1]
      .split(".")[0];
      
  notifications?.map((notif) => {
    
      const fecha = notif.attributes.createdAt.slice(0, 10);
      const hora = notif.attributes.createdAt.slice(11, 16);
      const horaCreado = deleteZero(hora.slice(0, 2));
    const horaActual = deleteZero(currentTimeString.slice(0, 2));
    const diaActual = deleteZero(currentDateString.slice(5, 7));
    const diaCreado = deleteZero(currentDateString.slice(5, 7));
    
      if (diaActual-diaCreado >= 3) {
        const response = AxiosInstance.delete(`${API}notifications/${notif.id}`)
          .then((response) => {
            return;
          })
          .catch((error) => {
            return;
          });
      }  else if (fecha !== currentDateString) {
        const response = AxiosInstance.delete(`${API}notifications/${notif.id}`)
          .then((response) => {
            return;
          })
          .catch((error) => {
            return;
          });
      } 
    });
};
  
export const deletePortfolios = async (portfolios) => {
    if (portfolios.length > 0) {
      for (let index = 0; index < portfolios.length; index++) {
        const response = await axios
          .delete(`${API}portafolios/${portfolios[index]}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
          })
          .then((resp) => {
            
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  export const findAndDeletePortfolios = async (userId) => {
    let portfolios = [];
    const response = await axios
      .get(`${API}portafolios?filters[creadoPor][$eq]=${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((resp) => {
        resp.data.data.map((data) => {
          portfolios.push(data.id);
        });
        
      })
      .catch((err) => {
        console.log(err);
      });
    deletePortfolios(portfolios);
};
  
