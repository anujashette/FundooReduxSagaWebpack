import axios from 'axios';

const backendUrl = 'http://fundoonotes.incubation.bridgelabz.com/api';

export function create (createParam) {    
    console.log('http axios',createParam);
    
    return axios.post(backendUrl + createParam.route , createParam.jsonObject, createParam.headers);
}


// export function create (createParam) {    
//     console.log('http axios',createParam.jsonObject);
    
//     return axios.post(`http://fundoonotes.i , createParam.jsonObject);
// }


