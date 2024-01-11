const HEADER = {
    'Content-Type': 'application/json',
}
import axios from "axios"
import environment from '../environment'

const API_URL = environment.optimizationServiceUrl + "/order";

export function getOrders(){
    const url = API_URL + "/get-orders"
    return axios.get(url);
}

export function addOrder(order){
    const url = API_URL + "/create-order"
    return axios.post(url, order, {headers: HEADER})
}
