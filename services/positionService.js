const HEADER = {
  'Content-Type': 'application/json'
}
import axios from "axios"
import environment from '../environment'

const API_URL = environment.optimizationServiceUrl;

export function getPositions(){
    const url = API_URL + "/getAllPositions";
    return axios.get(url);
}