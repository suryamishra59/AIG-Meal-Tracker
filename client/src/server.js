import { invokeAPI } from './util';
import {
    API_BASE_URL,
    API_SIGNIN,
    API_USER,
    API_MEAL
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

export const getMeals = async () => {
    const request = {
        method: 'GET',
        url: API_MEAL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    };

    return await invokeAPI(request);;
};

export const createMeal = async (payload) => {
    const request = {
        method: 'POST',
        url: API_MEAL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        data: payload
    };

    return await invokeAPI(request);;
};


export const deleteMeal = async (id) => {
    const request = {
        method: 'DELETE',
        url: API_MEAL + "/" + id,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    };

    return await invokeAPI(request);;
};

export const editMeal = async (id, payload) => {
    const request = {
        method: 'PUT',
        url: API_MEAL + "/" + id,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        data: payload
    };

    return await invokeAPI(request);;
};
