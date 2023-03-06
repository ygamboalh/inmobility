export const filterDataByVentasDeCasasYApartamentos = [
  {
    items: [
      { name: 'Provincia 1', value: 'provincia1' },
      { name: 'Provincia 2', value: 'provincia2' },
    ],
    placeholder: 'Provincia',
    consulta: 'provincia'
  },
  {
    items: [
      { name: 'Canton 1', value: 'canton1' },
      { name: 'Canton 2', value: 'canton2' },
    ],
    placeholder: 'Canton',
    consulta: 'canton'
  },
  {
    items: [
      { name: 'Distrito 1', value: 'distrito1' },
      { name: 'Distrito 2', value: 'distrito2' },
    ],
    placeholder: 'Distrito',
    consulta: 'distrito'
  },
  {
    items: [
      { name: 'Precio 1', value: 'precio1' },
      { name: 'Precio 2', value: 'precio2' },
    ],
    placeholder: 'Precio',
    consulta: 'precio'
  },
  {
    items: [
      { name: 'Tipo Inmueble 1', value: 'tipoInmueble1' },
      { name: 'Tipo Inmueble 2', value: 'tipoInmueble2' },
    ],
    placeholder: 'Tipo Inmueble',
    consulta: 'tipoInmueble'
  },
  {
    items: [
      { name: 'Amenidades 1', value: 'amenidades1' },
      { name: 'Amenidades 2', value: 'amenidades2' },
    ],
    placeholder: 'Amenidades',
    consulta: 'amenidades'
  },
  {
    items: [
      { name: 'Area Contruccion 1', value: 'areaContruccion1' },
      { name: 'Area Contruccion 2', value: 'areaContruccion2' },
    ],
    placeholder: 'Area Contruccion',
    consulta: 'areaContruccion'
  },
  {
    items: [
      { name: 'Area Terreno 1', value: 'areaTerreno1' },
      { name: 'Area Terreno 2', value: 'areaTerreno2' },
    ],
    placeholder: 'Area Terreno',
    consulta: 'areaTerreno'
  },
  {
    items: [
      { name: 'Habitaciones 1', value: 'habitaciones1' },
      { name: 'Habitaciones 2', value: 'habitaciones2' },
    ],
    placeholder: 'Habitaciones',
    consulta: 'habitaciones'
  },
  {
    items: [
      { name: 'Baths 1', value: 'baths1' },
      { name: 'Baths 2', value: 'baths2' },
    ],
    placeholder: 'Baths',
    consulta: 'baths'
  },
  {
    items: [
      { name: 'Patio o Jardin 1', value: 'patioOJardin1' },
      { name: 'Patio o Jardin 2', value: 'patioOJardin2' },
    ],
    placeholder: 'Patio o Jardin',
    consulta: 'patioOJardin'
  },
  {
    items: [
      { name: 'Cochera 1', value: 'cochera1' },
      { name: 'Cochera 2', value: 'cochera2' },
    ],
    placeholder: 'Cochera',
    consulta: 'cochera'
  },
  {
    items: [
      { name: 'Ley 7600 1', value: 'ley7600-1' },
      { name: 'Ley 7600 2', value: 'ley7600-2' },
    ],
    placeholder: 'Ley 7600',
    consulta: 'ley7600'
  },
]

export const getFilterValues = (filterValues) => {
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
  } = filterValues;

  const values = [
    { name: 'provincia', value: provincia },
    { name: 'canton', value: canton },
    { name: 'distrito', value: distrito },
    { name: 'precio', value: precio },
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

  return values;
}