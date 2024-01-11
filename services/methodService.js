const HEADER = {
    'Content-Type': 'application/json',
}
import axios from "axios"
import environment from '../environment'

const API_URL = environment.optimizationServiceUrl + "/method";

export function getMethods(){
    const url = API_URL + "/get-methods"
    return axios.get(url);
}
