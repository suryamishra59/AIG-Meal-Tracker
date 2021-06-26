const User = require('./user');

module.exports = (router) => {
    return {
        User: User(router)
    };
};