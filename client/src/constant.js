const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

module.exports = {
    // APIs PATH
    API_BASE_URL: API_BASE_URL,
    API_SIGNIN: API_BASE_URL + '/user/signin',
    API_USER: API_BASE_URL + '/user',

    
    LS_USER_OBJECT_KEY: 'user_info'
};