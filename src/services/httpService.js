import axios from 'axios';

const backendUrl = 'http://fundoonotes.incubation.bridgelabz.com/api';

export function create (createParam) {    
    return axios.post(backendUrl + createParam.route , createParam.jsonObject);
}