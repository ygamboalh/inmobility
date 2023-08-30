
//** Recibe los filtros y devuelve sus consulas */

export const QueriesByFilters = (filterValue) => {
  const {
  uniqueId,
    provincia,
    canton,
    distrito,
    precio,
    tipoPropiedad,
    amenidades,
    areaContruccion,
    serviciosMedicos,
    habitaciones,
    banos,
    jardinPatio,
    cochera,
    ley7600,

  detallesInternos,
  detallesExternos,
  areaTerreno,
  areaPropiedad,
  amueblado,
  aptoHijos,
  aptoMascotas,
  cuotaMantenimiento, 
  areaBodega,
  altura,
  concepcionElectrica,
  areaCarga,
  areaPlantas,
  numeroPlantas,
  ubicacionCastral,
  ubicacionDemografica,
  ubicacionGeografica,
  areaMesanini,
  areaSotano,
  tipoDensidad,
  servicios,
  usoDeSuelo,
    parqueo,
    tipoPiso,
    moneda,
    monedaAlquiler,
    precioAlquiler,
    precioAlquilerCompra,
    monedaAlquilerVenta,
    monedaCuotaMantenimiento,
    tomadaExclusividad,
    vistaPanoramica,
    duenoFinanciaCompra,
    duenoRecibeVehiculo,
    tieneCuotaMantenimiento,
    ivaVenta,
    ivaAlquiler,
    avaluo,
    avaluoMoneda,
    tipoVivienda
  
  } = filterValue;
  const queries = [
    { name: `&filters[uniqueId][$eq]=${uniqueId}`, value: uniqueId },
    { name: `&filters[provincia][$eq]=${provincia}`, value: provincia },
    { name: `&filters[canton][$contains]=${canton}`, value: canton },
    { name: `&filters[distrito][$contains]=${distrito}`, value: distrito },
    { name: `&filters[precio][$eq]=${precio}`, value: precio },
    { name: `&filters[tipoPropiedad][$eq]=${tipoPropiedad}`, value: tipoPropiedad },
    { name: 'amenidades', value: amenidades },
    { name: `&jardinPatio`, value: jardinPatio },
    { name: `&filters[cochera][$eq]=${cochera}`, value: cochera },
    { name: `&detallesInternos`, value: detallesInternos },
    { name: '&detallesExternos', value: detallesExternos },
    { name: `&filters[areaTerreno][$eq]=${areaTerreno}`, value: areaTerreno },
    { name: `&filters[areaPropiedad][$eq]=${areaPropiedad}`, value: areaPropiedad },
    { name: `&filters[amueblado][$eq]=${amueblado}`, value: amueblado },
    { name: `&filters[aptoHijos][$eq]=${aptoHijos}`, value: aptoHijos },
    { name: `&filters[aptoMascotas][$eq]=${aptoMascotas}`, value: aptoMascotas },
    { name: `&filters[concepcionElectrica][$eq]=${concepcionElectrica}`, value: concepcionElectrica },
    { name: `&filters[areaCarga][$eq]=${areaCarga}`, value: areaCarga },
    { name: `&filters[tipoDensidad][$eq]=${tipoDensidad}`, value: tipoDensidad },
    { name: `&filters[ubicacionGeografica][$eq]=${ubicacionGeografica}`, value: ubicacionGeografica },
    { name: `&filters[servicios][$eq]=${servicios}`, value: servicios },
    { name: `&filters[ubicacionCastral][$eq]=${ubicacionCastral}`, value: ubicacionCastral },
    { name: `&filters[ubicacionDemografica][$eq]=${ubicacionDemografica}`, value: ubicacionDemografica },
    { name: `&filters[areaPlantas][$eq]=${areaPlantas}`, value: areaPlantas },
    { name: `&filters[numeroPlantas][$eq]=${numeroPlantas}`, value: numeroPlantas },
    { name: `&filters[usoDeSuelo][$eq]=${usoDeSuelo}`, value: usoDeSuelo },
    { name: `&filters[parqueo][$eq]=${parqueo}`, value: parqueo },
    { name: `&filters[areaMesanini][$eq]=${areaMesanini}`, value: areaMesanini },
    { name: `&filters[areaSotano][$eq]=${areaSotano}`, value: areaSotano },
    { name: `&filters[cuotaMantenimiento][$eq]=${cuotaMantenimiento}`, value: cuotaMantenimiento },
    { name: `&filters[areaBodega][$eq]=${areaBodega}`, value: areaBodega },
    { name: `&filters[altura][$eq]=${altura}`, value: altura },
    { name: `&filters[areaContruccion][$lt]=${areaContruccion}`, value: areaContruccion },
    { name: `&filters[habitaciones][$eq]=${habitaciones}`, value: habitaciones },
    { name: `&filters[banos][$eq]=${banos}`, value: banos},
    { name: `&filters[ley7600][$eq]=${ley7600}`, value: ley7600 },
    { name: `&filters[serviciosMedicos][$eq]=${serviciosMedicos}`, value: serviciosMedicos },
    { name: `&filters[tipoPiso][$eq]=${tipoPiso}`, value: tipoPiso },
    { name: `&filters[monedaAlquiler][$eq]=${monedaAlquiler}`, value: monedaAlquiler },
    { name: `&filters[monedaAlquilerVenta][$eq]=${monedaAlquilerVenta}`, value: monedaAlquilerVenta },
    { name: `&filters[monedaCuotaMantenimiento][$eq]=${monedaCuotaMantenimiento}`, value: monedaCuotaMantenimiento },
    { name: `&filters[tomadaExclusividad][$eq]=${tomadaExclusividad}`, value: tomadaExclusividad },
    { name: `&filters[vistaPanoramica][$eq]=${vistaPanoramica}`, value: vistaPanoramica },
    { name: `&filters[duenoFinanciaCompra][$eq]=${duenoFinanciaCompra}`, value: duenoFinanciaCompra },
    { name: `&filters[duenoRecibeVehiculo][$eq]=${duenoRecibeVehiculo}`, value: duenoRecibeVehiculo },
    { name: `&filters[tieneCuotaMantenimiento][$eq]=${tieneCuotaMantenimiento}`, value: tieneCuotaMantenimiento },
    { name: `&filters[moneda][$eq]=${moneda}`, value: moneda },
    { name: `&filters[ivaVenta][$eq]=${ivaVenta}`, value: ivaVenta },
    { name: `&filters[ivaAlquiler][$eq]=${ivaAlquiler}`, value: ivaAlquiler },
    { name: `&filters[avaluo][$eq]=${avaluo}`, value: avaluo },
    { name: `&filters[avaluoMoneda][$eq]=${avaluoMoneda}`, value: avaluoMoneda },
    { name: `&filters[precioAlquiler][$eq]=${precioAlquiler}`, value: precioAlquiler },
    { name: `&filters[precioAlquilerCompra][$eq]=${precioAlquilerCompra}`, value: precioAlquilerCompra },
    { name: `&filters[tipoVivienda][$eq]=${tipoVivienda}`, value: tipoVivienda },

  ];
  // Devolviendo solo los elementos donde su valor no se undefined para evitar problemas en las consultas
  const firstQueries = queries.filter((item) => item.value !== undefined);
//quito tambien los elementos donde su valor este vacio
  return firstQueries.filter((item) => item.value !== "")
  //return queries.filter((item) => item.value !== "undefined")
}