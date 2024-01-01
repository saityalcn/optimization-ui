const HEADER = {
    'Content-Type': 'application/json',
}
import axios from "axios"
import environment from '../environment'

const API_URL = environment.optimizationServiceUrl + "/user";

export function getUsers(){
    const url = API_URL + "/getUsers"
    return axios.get(url);
}

export function registerUser(user){
    const url = API_URL + "/register"
    return axios.post(url, user, {headers: HEADER})
}

export function login(user){
    const url = API_URL + "/login"
    return axios.post(url, user, {headers: HEADER})
}