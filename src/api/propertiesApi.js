import AxiosInstance from "./AxiosInstance"

export const authUser = async ( userData ) => {
  const { data } = await AxiosInstance.post('/auth/local', userData);
  return data
}

export const getAllProperties = async () => {
  const { data } = await AxiosInstance.get('/properties');
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