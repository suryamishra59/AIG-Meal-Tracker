import axios from 'axios';

export const invokeAPI = async params => {
    let result;
    try {
        result = await axios(params);
        return result.data;
    } catch (error) {
        console.error(error);
        const errorMsg = (error.response && error.response.data) ? error.response.data.message : error.toString();
        throw errorMsg;
    }
};

export const loginUser = async params => {
    
};