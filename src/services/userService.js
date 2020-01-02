import { create } from '../services/httpService';

export function registerUser(userObj) {
    console.log(userObj);
    
    let userParam = {
        route: '/user/userSignUp',
        jsonObject: userObj
    }

    create(userParam)
    .then((response)=> {
        console.log('response===>',response);
        message = 'User registered successfully';
        //  return 'User registration successfully';
    })
    .catch((error)=> {
        console.log('user signup error========>',error);
        message = 'User already registered';
        // return 'User already registered';

    })
}