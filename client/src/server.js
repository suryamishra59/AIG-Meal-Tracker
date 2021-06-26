import { invokeAPI } from './util';
import { API_BASE_URL } from './constant'

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