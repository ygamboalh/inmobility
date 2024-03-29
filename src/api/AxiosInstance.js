import axios from "axios";
import { BEARER } from "../constant";
import { getToken } from "../utils/helpers";


//const baseUrlForProperties = 'http://147.182.188.52/backend/api/'
//const baseUrlForProperties ="https://backend.siccic.com/api/"
const baseUrlForProperties ="https://backend.sistemacic.com/api/"
//const baseUrlForProperties = 'https://sistemacic-backend.herokuapp.com/api'
//const baseUrlForProperties = 'https://sistemacic.com/backend/api/'

export default axios.create({
  baseURL: baseUrlForProperties,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization' : getToken() != null ? `${BEARER} ${getToken()}` : null,
  }
})

