import axios from "axios";

const baseUrlForProperties = 'http://147.182.188.52/api/'
//const baseUrlForProperties = 'https://sistemacic-backend.herokuapp.com/api'

export default axios.create({
  baseURL: baseUrlForProperties,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

