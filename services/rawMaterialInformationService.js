const HEADER = {
    'Content-Type': 'application/json',
}
import axios from "axios"
import environment from '../environment'

const API_URL = environment.optimizationServiceUrl + "/rawMaterialInformation";

export function getRawMaterialInformations(){
    const url = API_URL + "/getRawMaterialInformations"
    return axios.get(url);
}
