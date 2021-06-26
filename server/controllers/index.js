const User = require('./user');
const Meal = require('./meal');

module.exports = (router) => {
    return {
        User: User(router),
        Meal: Meal(router),
    };
};