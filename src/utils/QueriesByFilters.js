
//** Recibe los filtros y devuelve sus consulas */

export const QueriesByFilters = (filterValue) => {

  const {
    province,
    canton,
    district,
    price,
    type,
    amenidades,
    areaContruccion,
    footage,
    rooms,
    bathroom,
    garden,
    parkingNumber,
    law7600
  } = filterValue;

  const queries = [
    { name: 'filters[province][$containsi]', value: province },
    { name: 'canton', value: canton },
    { name: 'district', value: district },
    { name: 'filters[price][$lte]', value: price },
    { name: 'type', value: type },
    { name: 'amenidades', value: amenidades },
    { name: 'areaContruccion', value: areaContruccion },
    { name: 'footage', value: footage },
    { name: 'rooms', value: rooms },
    { name: 'bathroom', value: bathroom },
    { name: 'garden', value: garden },
    { name: 'parkingNumber', value: parkingNumber },
    { name: 'law7600', value: law7600 },
  ];
  // Devolviendo solo los elementos donde su valor no se undefined para evitar problemas en las consultas
  return queries.filter((item) => item.value !== undefined)
}