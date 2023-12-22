
const HEADER = {
    'Content-Type': 'application/json',
}
import axios from "axios"
import environment from '../environment'

const API_URL = environment.optimizationServiceUrl;

export function logIn(jsonObject){
    const url = API_URL + "/auth"
    console.log(url);
    return axios.post(url, {},{auth: jsonObject})
}
