import AxiosInstance from "./AxiosInstance"

export const authUser = async ( userData ) => {
  const { data } = await AxiosInstance.post('/auth/local', userData);
  return data
}

export const getAllProperties = async () => {
  let allData = [];
  let data = [];
  const { data:firstdata } = await AxiosInstance.get('/properties');
  const totalPaginas = firstdata.meta.pagination.pageCount;

  for (let page = 1; page <= totalPaginas; page++) {
    const { data:actualData } = await AxiosInstance.get(`/properties?populate=*&pagination[page]=${page}&pagination[pageSize]=25`);
    allData.push(actualData.data);
  }
  allData.map((datos) => {
    datos.forEach((datosA) => {
      data.push(datosA);
    })
  })
  return { data:data };
}
export const getAllPropertiesRQ = async () => {
  //const { data } = await AxiosInstance.get('/properties?populate=*');
  //return data
  let allData = [];
  let data = [];
  const { data:firstdata } = await AxiosInstance.get('/properties');
  const totalPaginas = firstdata.meta.pagination.pageCount;

  for (let page = 1; page <= totalPaginas; page++) {
    const { data:actualData } = await AxiosInstance.get(`/properties?populate=*&pagination[page]=${page}&pagination[pageSize]=25`);
    allData.push(actualData.data);
  }
  allData.map((datos) => {
    datos.forEach((datosA) => {
      data.push(datosA);
    })
  })
  return { data:data };
}
export const getAllButtons = async () => {
  const { data } = await AxiosInstance.get('/buttons?populate=*');
  return data
}
export const getAllNotifications = async () => {
  let allData = [];
  let data = [];
  const { data:firstdata } = await AxiosInstance.get('/notifications');
  const totalPaginas = firstdata.meta.pagination.pageCount;

  for (let page = 1; page <= totalPaginas; page++) {
    const { data:actualData } = await AxiosInstance.get(`/notifications?populate=*&pagination[page]=${page}&pagination[pageSize]=25`);
    allData.push(actualData.data);
  }
  allData.map((datos) => {
    datos.forEach((datosA) => {
      data.push(datosA);
    })
  })
  return { data:data };
}
export const getAllPortafolios = async () => {
  let allData = [];
  let data = [];
  const { data:firstdata } = await AxiosInstance.get('/portafolios');
  const totalPaginas = firstdata.meta.pagination.pageCount;

  for (let page = 1; page <= totalPaginas; page++) {
    const { data:actualData } = await AxiosInstance.get(`/portafolios?populate=*&pagination[page]=${page}&pagination[pageSize]=25`);
    allData.push(actualData.data);
  }
  allData.map((datos) => {
    datos.forEach((datosA) => {
      data.push(datosA);
    })
  })
  return { data:data };
}

export const getAllLinks = async () => {
  let allData = [];
  let data = [];
  const { data:firstdata } = await AxiosInstance.get('/links');
  const totalPaginas = firstdata.meta.pagination.pageCount;

  for (let page = 1; page <= totalPaginas; page++) {
    const { data:actualData } = await AxiosInstance.get(`/links?pagination[page]=${page}&pagination[pageSize]=25`);
    allData.push(actualData.data);
  }
  allData.map((datos) => {
    datos.forEach((datosA) => {
      data.push(datosA);
    })
  })
  return { data:data };
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