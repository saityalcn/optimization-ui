const HEADER = {
  'Content-Type': 'application/json'
}
import axios from "axios"
import environment from '../environment'

const API_URL = environment.optimizationServiceUrl;

export function addProjectPosition(jsonObject){
    const url = API_URL + "/addProjectPosition"
    return axios.post(url, jsonObject,{headers: HEADER})
}