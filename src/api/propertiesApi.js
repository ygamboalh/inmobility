import AxiosInstance from "./AxiosInstance"

export const authUser = async ( userData ) => {
  const { data } = await AxiosInstance.post('/auth/local', userData);
  return data
}

export const getAllProperties = async () => {
  const { data } = await AxiosInstance.get('/properties');
  return data
}
export const getAllPropertiesRQ = async () => {
  const { data } = await AxiosInstance.get('/properties?populate=*');
  return data
}
export const getAllNotifications = async () => {
  const { data } = await AxiosInstance.get('/notifications?populate=*');
  return data
}
export const getAllPortafolios = async () => {
  const { data } = await AxiosInstance.get('/portafolios?populate=*');
  return data
}

export const getAllLinks = async () => {
  const { data } = await AxiosInstance.get('/links');
  return data
}
export const getActiveProperties = async () => {
  const foundedProperties = [];
  const { data: properties } = await getAllProperties();
  properties && properties.forEach(property => {
      if(property.attributes.active === 'Activo') {
        foundedProperties.push(property);
            }
  });
  return {data:foundedProperties}
}
export const getActiveLinks = async () => {
  const foundedLinks = [];
  const { data: links } = await getAllLinks();
  links && links.forEach(link => {
      if(link.active === 'Activo') {
        foundedLinks.push(link);
            }
  });
  return {data:foundedLinks}
}

export const getDesacProperties = async () => {
  const foundedProperties = [];
  const { data: properties } = await getAllProperties();
  properties && properties.forEach(property => {
      if(property.attributes.active === 'Desactivado') {
        foundedProperties.push(property);
            }
  });
  return {data:foundedProperties}
}

export const getPendingProperties = async () => {
  const foundedProperties = [];
  const { data: properties } = await getAllProperties();
  properties && properties.forEach(property => {
      if(property.attributes.active === 'Pendiente' || !property.attributes.active ) {
        foundedProperties.push(property);
            }
  });
  return {data:foundedProperties}
}