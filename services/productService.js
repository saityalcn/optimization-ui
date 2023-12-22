const HEADER = {
    'Content-Type': 'application/json',
}
import axios from "axios"
import environment from '../environment'

const API_URL = environment.optimizationServiceUrl + "/product";

export function getProducts(){
    const url = API_URL + "/get-products"
    return axios.get(url);
}

export function addProduct(product){
    const url = API_URL + "/create-product"
    return axios.post(url, product, {headers: HEADER})
}
