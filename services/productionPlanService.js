const HEADER = {
    'Content-Type': 'application/json',
}
import axios from "axios"
import environment from '../environment'

const API_URL = environment.optimizationServiceUrl + "/productionPlan";

export function getProductionPlans(){
    const url = API_URL + "/getProductionPlans"
    return axios.get(url);
}

export function addProductionPlan(productionPlan){
    const url = API_URL + "/createProductionPlan"
    return axios.post(url, productionPlan, {headers: HEADER})
}

export function saveOptimizedProduction(id){
    const url = API_URL + "/saveOptimizedProduction"
    return axios.post(url, id, {headers: HEADER})
}
