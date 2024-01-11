const HEADER = {
    'Content-Type': 'application/json',
}
import axios from "axios"
import environment from '../environment'

const API_URL = environment.optimizationServiceUrl + "/rawMaterial";

export function getRawMaterials(){
    const url = API_URL + "/getRawMaterials"
    return axios.get(url);
}

export function addRawMaterial(rawMaterial){
    const url = API_URL + "/createRawMaterial"
    return axios.post(url, rawMaterial, {headers: HEADER})
}
