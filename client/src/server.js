import { invokeAPI } from './util';
import {
    API_BASE_URL,
    API_SIGNIN,
    API_USER
} from './constant';

export const helloWorld = async _ => {
    const request = {
        method: 'GET',
        url: API_BASE_URL,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return await invokeAPI(request);
};

export const signIn = async payload => {
    const request = {
        method: 'POST',
        url: API_SIGNIN,
        headers: {
            'Content-Type': 'application/json'
        },
        data: payload
    };

    return await invokeAPI(request);;
};

export const register = async payload => {
    const request = {
        method: 'POST',
        url: API_USER,
        headers: {
            'Content-Type': 'application/json'
        },
        data: payload
    };

    return await invokeAPI(request);;
};
