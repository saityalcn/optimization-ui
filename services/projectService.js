const HEADER = {
    'Content-Type': 'application/json'
  }
import axios from "axios"
import environment from '../environment'

const API_URL = environment.optimizationServiceUrl;

export function getAllProjects(){
    const url = API_URL + "/getProjects"
    return axios.get(url)
}

export function addProject(jsonObject){
    const url = API_URL + "/addProject"
    return axios.post(url, jsonObject,{headers: HEADER})
}

export function finishProjectByProjectId(projectId){
    const url = API_URL + "/finishProject?projectId="+projectId;
    return axios.post(url, {}, {headers: HEADER})
}

export function getProjectsWithManagers(){
    const url = API_URL + "/getAllManager"
    return axios.post(url, {}, {headers: HEADER})
}

export function getExpiredProjects(){
    const url = API_URL + "/getExpiredProjects"
    return axios.post(url, {}, {headers: HEADER})
}


