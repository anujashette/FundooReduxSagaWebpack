import { create } from '../services/httpService';

export function registerUser(userObj) {

    let userParam = {
        route: '/user/userSignUp',
        jsonObject: userObj,
        headers: ''
    }
    return create(userParam);
}

export function loginUser(userObj) {

    let userParam = {
        route: '/user/login',
        jsonObject: userObj,
        headers: ''
    }
    console.log('user service=======>', userParam);

    return create(userParam);
}

export function forgotPassword(userObj) {

    let userParam = {
        route: '/user/reset',
        jsonObject: userObj,
        headers: ''
    }
    console.log('user service=======>', userParam);

    return create(userParam);
}


export function resetPassword(userObj) {
    console.log('user service=======>', userObj);

    let userParam = {
        route: `/user/reset-password?access_token=${userObj.token}`,
        jsonObject: userObj.passwordField,
        headers:''
}
console.log(userParam);

return create(userParam);
}