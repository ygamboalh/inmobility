import { buyHouseAndAparmentFilters } from "./filters"
import { rentHouseAndAparmentFilters } from "./filters"

export const filtersByRoute = [
  {
    indicator: '/ventas/casas-apartamentos',
    data: buyHouseAndAparmentFilters
  },
  {
    indicator: '/alquiler/casas-apartamentos',
    data: rentHouseAndAparmentFilters
  }
]