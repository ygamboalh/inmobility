
//** Recibe los filtros y devuelve sus consulas */

export const QueriesByFilters = (filterValue) => {

  const {
    provincia,
    canton,
    distrito,
    precio,
    tipoInmueble,
    amenidades,
    areaContruccion,
    areaTerreno,
    habitaciones,
    baths,
    patioOJardin,
    cochera,
    ley7600
  } = filterValue;

  const queries = [
    { name: 'provincia', value: provincia },
    { name: 'canton', value: canton },
    { name: 'distrito', value: distrito },
    { name: 'filters[price][$eq]', value: precio },
    { name: 'tipoInmueble', value: tipoInmueble },
    { name: 'amenidades', value: amenidades },
    { name: 'areaContruccion', value: areaContruccion },
    { name: 'areaTerreno', value: areaTerreno },
    { name: 'habitaciones', value: habitaciones },
    { name: 'baths', value: baths },
    { name: 'patioOJardin', value: patioOJardin },
    { name: 'cochera', value: cochera },
    { name: 'ley7600', value: ley7600 },
  ];
  // Devolviendo solo los elementos donde su valor no se undefined para evitar problemas en las consultas
  return queries.filter((item) => item.value !== undefined)
}